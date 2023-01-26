import { LOGOUT_SUCCESS, AUTH_SUCCESS, USER_UPDATED } from '../actions/auth'
import { TUser } from '../../utils/types'
import { TAuth } from '../actions/auth'

type TAuthState = {
  user: undefined | null | TUser
}

const authInitialState: TAuthState = {
  user: undefined,
}

export const authReducer = (
  state = authInitialState,
  action: TAuth,
): TAuthState => {
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
