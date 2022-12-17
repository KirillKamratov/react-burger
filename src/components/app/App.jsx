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
  Feed,
} from '../../pages'
import { ProtectedRoute } from '../protected-route/protected-route'
import {
  setAccessToken,
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from '../../utils/auth'
import { AUTH_SUCCESS, LOGOUT_SUCCESS } from '../../services/actions/auth'
import { fetchToken, fetchUser } from '../../utils/api'
import IngredientDetails from '../ingredient-details'
import OrderInfo from '../order-info'

function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const background = location.state?.background

  React.useEffect(() => {
    async function auth() {
      const accessToken = getAccessToken()
      if (!accessToken) {
        dispatch({ type: LOGOUT_SUCCESS })
        return
      }
      const userData = await fetchUser(accessToken)
      if (!userData.success) {
        const tokenData = await fetchToken(getRefreshToken())
        if (!tokenData.success) {
          removeAccessToken()
          removeRefreshToken()
          dispatch({ type: LOGOUT_SUCCESS })
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

  const closeModal = () => {
    history.goBack()
  }

  return (
    <div className={`${AppStyles.App}`}>
      <Header />
      <Switch location={background || location}>
        <Route
          path='/react-burger'
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
        <Route
          path='/ingredients/:id'
          exact
        >
          <Ingredient />
        </Route>
        <Route
          exact
          path={'/feed'}
        >
          <Feed />
        </Route>
        <Route
          exact
          path={'/feed/:id'}
        >
          <OrderInfo inModal={false} />
        </Route>
        <ProtectedRoute
          path='/profile'
          exact
        >
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path='/profile/orders'
        >
          <Orders />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path={'/profile/orders/:id'}
        >
          <OrderInfo inModal={false} />
        </ProtectedRoute>
      </Switch>
      {background && (
        <Switch>
          <Route
            exact
            path='/ingredients/:id'
          >
            <Modal closeModal={closeModal}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route
            exact
            path={'/feed/:id'}
          >
            <Modal closeModal={closeModal}>
              <OrderInfo inModal={true} />
            </Modal>
          </Route>
          <ProtectedRoute
            exact
            path={'/profile/orders/:id'}
          >
            <Modal closeModal={closeModal}>
              <OrderInfo inModal={true} />
            </Modal>
          </ProtectedRoute>
        </Switch>
      )}
    </div>
  )
}

export default App
