import { isOk, RESET_PASSWORD_URL } from '../../utils/api'

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR'

export function resetPassword(data) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    })
    fetch(RESET_PASSWORD_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(isOk)
      .then(data => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        })
        console.log(data.message)
      })
      .catch(e => {
        console.log(e.message)
        dispatch({
          type: RESET_PASSWORD_ERROR,
        })
      })
  }
}
