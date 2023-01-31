import { INGREDIENTS_URL, isOk } from '../../utils/api'
import { TIngredients } from '../../utils/types'
import { AppDispatch } from '../store'

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' =
  'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_REQUEST_SUCCESS: 'GET_INGREDIENTS_REQUEST_SUCCESS' =
  'GET_INGREDIENTS_REQUEST_SUCCESS'
export const GET_INGREDIENTS_REQUEST_FAILED: 'GET_INGREDIENTS_REQUEST_FAILED' =
  'GET_INGREDIENTS_REQUEST_FAILED'

export interface IGetIngredientRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_REQUEST_SUCCESS
  readonly ingredients: Array<TIngredients>
}

export interface IGetIngredientsError {
  readonly type: typeof GET_INGREDIENTS_REQUEST_FAILED
}

export type TGetIngredients =
  | IGetIngredientRequest
  | IGetIngredientsSuccess
  | IGetIngredientsError

export function getIngredients() {
  return function (dispatch: AppDispatch) {
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
