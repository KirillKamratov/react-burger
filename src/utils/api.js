const BASE_API_URL = 'https://norma.nomoreparties.space/api'
export const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`
export const ORDER_URL = `${BASE_API_URL}/orders`
export const FORGOT_PASSWORD_URL = `${BASE_API_URL}/password-reset`
export const RESET_PASSWORD_URL = `${BASE_API_URL}/password-reset/reset`
export const LOGIN_URL = `${BASE_API_URL}/auth/login `
export const REGISTRATION_URL = `${BASE_API_URL}/auth/register`
export const LOGOUT_URL = `${BASE_API_URL}/auth/logout`
export const TOKEN_URL = `${BASE_API_URL}/auth/token`
export const USER_URL = `${BASE_API_URL}/auth/user`
export const wsUrl = 'wss://norma.nomoreparties.space/orders'

export const isOk = res => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export function fetchToken(refreshToken) {
  return fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  }).then(isOk)
}

export function fetchUser(accessToken) {
  return fetch(USER_URL, {
    headers: {
      'Content-type': 'application/json',
      Authorization: accessToken,
    },
  }).then(isOk)
}
