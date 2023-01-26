import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { constructorReducer } from './constructor'
import { openIngredientDetailsReducer } from './ingredient'
import { orderDetailsReducer } from './orderDetails'
import { forgotPasswordReducer } from './forgotPassword'
import { resetPasswordReducer } from './resetPassword'
import { authReducer } from './auth'
import { wsReducer } from './wsReducer'
import { TRootState } from '../store'

export const selectIngredients = (store: TRootState) =>
  store.ingredients.ingredients

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientDetails: openIngredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  auth: authReducer,
  webSocket: wsReducer,
})
