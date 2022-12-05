import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { constructorReducer } from './constructor'
import { openIngredientDetailsReducer } from './ingredient'
import { orderDetailsReducer } from './orderDetails'
import { forgotPasswordReducer } from './forgotPassword'
import { resetPasswordReducer } from './resetPassword'
import { authReducer } from './auth'

export const selectIngredients = store => store.ingredients.ingredients

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientDetails: openIngredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  auth: authReducer,
})
