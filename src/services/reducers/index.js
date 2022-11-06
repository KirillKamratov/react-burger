import { combineReducers } from 'redux'
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_REQUEST_SUCCESS,
  GET_INGREDIENTS_REQUEST_FAILED,
  ADD_BUN,
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  DELETE_INGREDIENT,
  SHOW_INGREDIENT_DETAILS,
  HIDE_INGREDIENT_DETAILS,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_REQUEST,
  RESET_CONSTRUCTOR,
} from '../actions'

const serverIngredients = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
}

const constructorState = {
  ingredients: [],
  bunId: null,
}

const ingredientState = {
  clickedIngredientID: null,
}

const orderState = {
  orderRequest: false,
  orderRequestFailed: false,
  orderNumber: '',
}

const ingredientsReducer = (state = serverIngredients, action) => {
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
        ingredients: state.ingredients.concat(action.payload),
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

const openIngredientDetailsReducer = (state = ingredientState, action) => {
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

const orderDetailsReducer = (state = orderState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderRequestFailed: false,
      }
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderRequest: false,
        orderRequestFailed: false,
      }
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderRequestFailed: true,
      }
    }
    default: {
      return state
    }
  }
}

export const selectIngredients = store => store.ingredients.ingredients

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientDetails: openIngredientDetailsReducer,
  orderDetails: orderDetailsReducer,
})
