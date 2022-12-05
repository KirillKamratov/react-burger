import { INGREDIENTS_URL, isOk } from '../../utils/api'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_REQUEST_SUCCESS = 'GET_INGREDIENTS_REQUEST_SUCCESS'
export const GET_INGREDIENTS_REQUEST_FAILED = 'GET_INGREDIENTS_REQUEST_FAILED'

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    })
    fetch(INGREDIENTS_URL)
      .then(isOk)
      .then(ingredients => {
        dispatch({
          type: GET_INGREDIENTS_REQUEST_SUCCESS,
          ingredients: ingredients.data,
        })
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_REQUEST_FAILED,
        })
      })
  }
}
