import { LOGIN_URL, LOGOUT_URL, REGISTRATION_URL, isOk } from '../../utils/api'
import {
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  removeRefreshToken,
  removeAccessToken,
} from '../../utils/auth'

export const AUTH_SUCCESS = 'AUTH_SUCCESS'

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST'
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

export const USER_UPDATED = 'USER_UPDATED'

export function registration(data) {
  return function (dispatch) {
    dispatch({
      type: REGISTRATION_REQUEST,
    })
    return fetch(REGISTRATION_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(isOk)
      .then(responseDataFromServer => {
        setAccessToken(responseDataFromServer.accessToken)
        setRefreshToken(responseDataFromServer.refreshToken)
        dispatch({
          type: AUTH_SUCCESS,
          payload: responseDataFromServer.user,
        })
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: REGISTRATION_ERROR,
        })
      })
  }
}

export function login(formData) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    })
    return fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(isOk)
      .then(responseDataFromServer => {
        setAccessToken(responseDataFromServer.accessToken)
        setRefreshToken(responseDataFromServer.refreshToken)
        dispatch({
          type: AUTH_SUCCESS,
          payload: responseDataFromServer.user,
        })
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: LOGIN_ERROR,
        })
      })
  }
}

export function logout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    })
    fetch(LOGOUT_URL, {
      method: 'POST',
      body: JSON.stringify({ token: getRefreshToken() }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(isOk)
      .then(() => {
        removeRefreshToken()
        removeAccessToken()
        dispatch({
          type: LOGOUT_SUCCESS,
          user: null,
        })
      })
      .catch(err => {
        console.log(err.message)
        dispatch({
          type: LOGOUT_ERROR,
        })
      })
  }
}
