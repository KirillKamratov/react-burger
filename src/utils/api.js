const BASE_API_URL = 'https://norma.nomoreparties.space/api'
export const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`
export const ORDER_URL = `${BASE_API_URL}/orders`

export const isOk = res => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}