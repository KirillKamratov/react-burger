import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_REQUEST_FAILED,
  GET_INGREDIENTS_REQUEST_SUCCESS,
} from '../actions/ingredients'

const serverIngredients = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
}

export const ingredientsReducer = (state = serverIngredients, action) => {
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
