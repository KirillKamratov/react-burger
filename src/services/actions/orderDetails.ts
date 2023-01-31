import { isOk, ORDER_URL } from '../../utils/api'
import { getAccessToken } from '../../utils/auth'
import { AppDispatch, AppThunk } from '../store'

export const GET_ORDER_NUMBER_REQUEST: 'GET_ORDER_NUMBER_REQUEST' =
  'GET_ORDER_NUMBER_REQUEST'
export const GET_ORDER_NUMBER_SUCCESS: 'GET_ORDER_NUMBER_SUCCESS' =
  'GET_ORDER_NUMBER_SUCCESS'
export const GET_ORDER_NUMBER_FAILED: 'GET_ORDER_NUMBER_FAILED' =
  'GET_ORDER_NUMBER_FAILED'

export interface IGetOrderNumberRequest {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST
}

export interface IGetOrderNumberSuccess {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS
  readonly orderNumber: number
}

export interface IGetOrderNumberFailed {
  readonly type: typeof GET_ORDER_NUMBER_FAILED
}

export type TGetOrderNumber =
  | IGetOrderNumberRequest
  | IGetOrderNumberSuccess
  | IGetOrderNumberFailed

export const sendOrder = (order: Array<string>) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST,
    })
    fetch(ORDER_URL, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: order,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: getAccessToken(),
      },
    })
      .then(isOk)
      .then(data => {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          orderNumber: data.order.number,
        })
      })
      .catch(e => {
        console.log(e)
        dispatch({
          type: GET_ORDER_NUMBER_FAILED,
        })
      })
  }
}
