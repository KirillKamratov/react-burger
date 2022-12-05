import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  RESET_CONSTRUCTOR,
} from '../actions/constructor'

const constructorState = {
  ingredients: [],
  bunId: null,
}

export const constructorReducer = (state = constructorState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bunId: action.bunId,
      }
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, { ...action.payload }],
      }
    }
    case MOVE_INGREDIENT: {
      const ingredients = [...state.ingredients]
      ingredients.splice(
        action.hoverIndex,
        0,
        ingredients.splice(action.dragIndex, 1)[0],
      )
      return {
        ...state,
        ingredients: ingredients,
      }
    }
    case DELETE_INGREDIENT: {
      const newIngredients = [...state.ingredients]
      newIngredients.splice(action.payload, 1)
      return {
        ...state,
        ingredients: newIngredients,
      }
    }
    case RESET_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: constructorState.ingredients,
        bunId: null,
      }
    }
    default: {
      return state
    }
  }
}
