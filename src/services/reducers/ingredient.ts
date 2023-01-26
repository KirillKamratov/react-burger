import {
  HIDE_INGREDIENT_DETAILS,
  SHOW_INGREDIENT_DETAILS,
  TIngredient,
} from '../actions/ingredient'

type TIngredientState = {
  clickedIngredientID: null | string
}

const ingredientState = {
  clickedIngredientID: null,
}

export const openIngredientDetailsReducer = (
  state: TIngredientState = ingredientState,
  action: TIngredient,
): TIngredientState => {
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
