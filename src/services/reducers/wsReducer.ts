import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWebSocket,
} from '../actions/webSocket'
import { TOrders } from '../../utils/types'

type TInitialState = {
  wsConnected: boolean
  orders: Array<TOrders>
  error?: undefined
  total: null | number
  totalToday: null | number
}

const initialState = {
  wsConnected: false,
  orders: [],
  error: undefined,
  total: null,
  totalToday: null,
}

export const wsReducer = (
  state: TInitialState = initialState,
  action: TWebSocket,
): TInitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      }

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      }

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      }

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      }
    default:
      return state
  }
}
