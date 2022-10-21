const BASE_API_URL = 'https://norma.nomoreparties.space/api'
const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`
const ORDER_URL = `${BASE_API_URL}/orders`

const isOk = res => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const getBurgerIngredients = setData => {
  fetch(INGREDIENTS_URL)
    .then(isOk)
    .then(ingredients => {
      setData(ingredients.data)
    })
}

export const sendOrder = (order, setOrder) => {
  fetch(ORDER_URL, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: order,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(isOk)
    .then(data => {
      setOrder({ orderNumber: data.order.number })
    })
    .catch(error => {
      console.log(error.message)
    })
}
