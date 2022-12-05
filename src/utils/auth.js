const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

export function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  return window.localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setAccessToken(value) {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, value)
}

export function setRefreshToken(value) {
  window.localStorage.setItem(REFRESH_TOKEN_KEY, value)
}

export function removeAccessToken() {
  return window.localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export function removeRefreshToken() {
  return window.localStorage.removeItem(REFRESH_TOKEN_KEY)
}
