import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from '../actions/resetPassword'

const resetPasswordState = {
  resetPasswordRequest: false,
  resetPassword: false,
  resetError: false,
}

export const resetPasswordReducer = (state = resetPasswordState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPassword: false,
        resetError: false,
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPassword: true,
        resetError: false,
      }
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPassword: false,
        resetError: true,
      }
    }
    default: {
      return state
    }
  }
}
