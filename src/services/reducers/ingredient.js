import {
  HIDE_INGREDIENT_DETAILS,
  SHOW_INGREDIENT_DETAILS,
} from '../actions/ingredient'

const ingredientState = {
  clickedIngredientID: null,
}
export const openIngredientDetailsReducer = (
  state = ingredientState,
  action,
) => {
  switch (action.type) {
    case SHOW_INGREDIENT_DETAILS: {
      return {
        ...state,
        clickedIngredientID: action.ingredientID,
      }
    }
    case HIDE_INGREDIENT_DETAILS: {
      return {
        ...state,
        clickedIngredientID: null,
      }
    }
    default: {
      return state
    }
  }
}
