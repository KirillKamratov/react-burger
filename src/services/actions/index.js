import { INGREDIENTS_URL, isOk, ORDER_URL } from '../../utils/api'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_REQUEST_SUCCESS = 'GET_INGREDIENTS_REQUEST_SUCCESS'
export const GET_INGREDIENTS_REQUEST_FAILED = 'GET_INGREDIENTS_REQUEST_FAILED'

export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR'
export const ADD_BUN = 'ADD_BUN'
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'

export const SHOW_INGREDIENT_DETAILS = 'SHOW_INGREDIENT_DETAILS'
export const HIDE_INGREDIENT_DETAILS = 'HIDE_INGREDIENT_DETAILS'

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST'
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS'
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED'

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

export function sendOrder(order) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST,
    })
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
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          orderNumber: data.order.number,
        })
      })
      .catch(e => {
        console.log(e)
        dispatch({
          type: GET_ORDER_NUMBER_FAILED,
        })
      })
  }
}
