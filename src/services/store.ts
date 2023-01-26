import {
  compose,
  createStore,
  applyMiddleware,
  ActionCreator,
  Action,
  AnyAction,
} from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'
import {
  WS_CONNECTION_START,
  WS_SEND_MESSAGE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_CONNECTION_DISCONNECT,
} from './actions/webSocket'
import { socketMiddleware } from './middleware/socketMiddleware'
import { wsUrl } from '../utils/api'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { TAuth } from './actions/auth'
import { TConstructor } from './actions/constructor'
import { TForgotPassword } from './actions/forgotPassword'
import { TGetIngredients } from './actions/ingredients'
import { TGetOrderNumber } from './actions/orderDetails'
import { TResetPassword } from './actions/resetPassword'
import { TIngredient } from './actions/ingredient'
import { TWebSocket } from './actions/webSocket'

export type TAppActions =
  | TAuth
  | TConstructor
  | TForgotPassword
  | TGetIngredients
  | TGetOrderNumber
  | TResetPassword
  | TWebSocket
  | TIngredient

export type TRootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TAppActions>
>
export type TypedDispatch = ThunkDispatch<TRootState, any, AnyAction>

export const useCustomDispatch = () => useDispatch<TypedDispatch>()
export const useCustomSelector: TypedUseSelectorHook<TRootState> = useSelector
export type AppDispatch = typeof store.dispatch

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsClosing: WS_CONNECTION_DISCONNECT,
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancers = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)),
)

export const store = createStore(rootReducer, enhancers)
