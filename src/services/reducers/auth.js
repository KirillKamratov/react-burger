import { LOGOUT_SUCCESS, AUTH_SUCCESS, USER_UPDATED } from '../actions/auth'

const authInitialState = {
  user: undefined,
}

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS: {
      return {
        ...state,
        user: action.payload,
      }
    }
    case USER_UPDATED: {
      return {
        ...state,
        user: action.payload,
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
      }
    }
    default: {
      return state
    }
  }
}
