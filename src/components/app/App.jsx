import React from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import AppStyles from './App.module.css'
import Header from '../header'
import Modal from '../modal'
import { useDispatch } from 'react-redux'
import { getIngredients } from '../../services/actions/ingredients'
import {
  Register,
  Login,
  ForgotPassword,
  Profile,
  Ingredient,
  HomePage,
  ResetPassword,
  Orders,
} from '../../pages'
import { ProtectedRoute } from '../protected-route/protected-route'
import {
  setAccessToken,
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from '../../utils/auth'
import { AUTH_SUCCESS } from '../../services/actions/auth'
import { fetchToken, fetchUser } from '../../utils/api'
import IngredientDetails from '../ingredient-details'

function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const background = location.state?.background

  React.useEffect(() => {
    async function auth() {
      const accessToken = getAccessToken()
      if (!accessToken) return
      const userData = await fetchUser(accessToken)
      if (!userData.success) {
        const tokenData = await fetchToken(getRefreshToken())
        if (!tokenData.success) {
          removeAccessToken()
          removeRefreshToken()
          history.push('/login')
        } else {
          setAccessToken(tokenData.accessToken)
          await auth()
        }
      } else {
        dispatch({ type: AUTH_SUCCESS, payload: userData.user })
      }
    }
    auth()
  }, [])

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  const closeIngredientModal = () => {
    history.goBack()
  }

  return (
    <div className={`${AppStyles.App}`}>
      <Header />
      <Switch location={background || location}>
        <Route
          path='/'
          exact
        >
          <HomePage />
        </Route>
        <Route
          path='/register'
          exact
        >
          <Register />
        </Route>
        <Route
          path='/login'
          exact
        >
          <Login />
        </Route>
        <Route
          path='/forgot-password'
          exact
        >
          <ForgotPassword />
        </Route>
        <Route
          path='/reset-password'
          exact
        >
          <ResetPassword />
        </Route>
        <ProtectedRoute
          path='/profile'
          exact
        >
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path={'/profile/orders'}
        >
          <Orders />
        </ProtectedRoute>
        <Route
          path='/ingredients/:id'
          exact
        >
          <Ingredient />
        </Route>
      </Switch>
      {background && (
        <Route path='/ingredients/:id'>
          <Modal closeModal={closeIngredientModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </div>
  )
}

export default App
