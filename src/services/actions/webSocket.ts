import { AppDispatch, AppThunk } from '../store'
import { TOrders } from '../../utils/types'

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START'
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' =
  'WS_CONNECTION_SUCCESS'
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR'
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' =
  'WS_CONNECTION_CLOSED'
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE'
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE'
export const WS_CONNECTION_DISCONNECT: 'WS_CONNECTION_DISCONNECT' =
  'WS_CONNECTION_DISCONNECT'

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START
  readonly payload: string
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR
  readonly payload: string
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE
  readonly payload: {
    orders: Array<TOrders>
    total: number
    totalToday: number
  }
}

export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE
}

export type TWebSocket =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage
  | IWsSendMessage

export const startWebSocket = () => (dispatch: AppDispatch) => {
  dispatch({
    type: WS_CONNECTION_START,
    payload: '/all',
  })
}
export const startWebSocketWithToken =
  (accessToken: string) => (dispatch: AppDispatch) => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `?token=${accessToken}`,
    })
  }

export const closeWebSocket = () => (dispatch: AppDispatch) => {
  dispatch({
    type: WS_CONNECTION_CLOSED,
  })
}
