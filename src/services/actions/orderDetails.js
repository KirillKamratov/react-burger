import { isOk, ORDER_URL } from '../../utils/api'

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST'
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS'
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED'

export function sendOrder(order) {
  return function (dispatch) {
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
