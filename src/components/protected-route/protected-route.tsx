import React, { FC } from 'react'
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom'
import { getAccessToken } from '../../utils/auth'
import { TLocation } from '../../utils/types'

type TProtectedRoute = RouteProps & {
  onlyForAuth: boolean
  path: string
  children?: React.ReactNode
  exact?: boolean
}

const ProtectedRoute: FC<TProtectedRoute> = ({
  onlyForAuth,
  children,
  ...rest
}) => {
  const isAuthorized = getAccessToken()
  const location = useLocation<TLocation>()

  if (!onlyForAuth && isAuthorized) {
    const { from } = location.state || { from: { pathname: '/' } }
    return (
      <Route {...rest}>
        <Redirect to={from!} />
      </Route>
    )
  }

  if (onlyForAuth && !isAuthorized) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      </Route>
    )
  }

  return <Route {...rest}>{children}</Route>
}

export default ProtectedRoute
