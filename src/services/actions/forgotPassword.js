import { FORGOT_PASSWORD_URL, isOk } from '../../utils/api'

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR'

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    })
    fetch(FORGOT_PASSWORD_URL, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(isOk)
      .then(data => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        })
        console.log(data.message)
      })
      .catch(e => {
        console.log(e)
        dispatch({
          type: FORGOT_PASSWORD_ERROR,
        })
      })
  }
}
