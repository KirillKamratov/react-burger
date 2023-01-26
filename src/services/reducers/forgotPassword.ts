import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  TForgotPassword,
} from '../actions/forgotPassword'

type TForgotPasswordState = {
  forgotPasswordRequest: boolean
  forgotPasswordSuccess: boolean
  forgotPasswordError: boolean
}

const passwordState = {
  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordError: false,
}

export const forgotPasswordReducer = (
  state = passwordState,
  action: TForgotPassword,
): TForgotPasswordState => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordSuccess: false,
        forgotPasswordError: false,
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: true,
        forgotPasswordError: false,
      }
    }
    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: false,
        forgotPasswordError: true,
      }
    }
    default: {
      return state
    }
  }
}
