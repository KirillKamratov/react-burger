import {
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
} from '../actions/orderDetails'

const orderState = {
  orderRequest: false,
  orderRequestFailed: false,
  orderNumber: '',
}
export const orderDetailsReducer = (state = orderState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderRequestFailed: false,
      }
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderRequest: false,
        orderRequestFailed: false,
      }
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderRequestFailed: true,
      }
    }
    default: {
      return state
    }
  }
}
