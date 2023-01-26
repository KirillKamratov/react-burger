import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_REQUEST_FAILED,
  GET_INGREDIENTS_REQUEST_SUCCESS,
  TGetIngredients,
} from '../actions/ingredients'
import { TIngredient } from '../actions/ingredient'
import { TIngredients } from '../../utils/types'

type TServerIngredients = {
  ingredients: Array<TIngredients>
  ingredientsRequest: boolean
  ingredientsFailed: boolean
}

const serverIngredients = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
}

export const ingredientsReducer = (
  state: TServerIngredients = serverIngredients,
  action: TGetIngredients,
): TServerIngredients => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      }
    }
    case GET_INGREDIENTS_REQUEST_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      }
    }
    case GET_INGREDIENTS_REQUEST_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      }
    }
    default: {
      return state
    }
  }
}
