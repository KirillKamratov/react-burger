import { Redirect, Route } from 'react-router-dom'
import { useCustomSelector } from '../../services/store'
import React, { FC } from 'react'

export type TProtectedRoute = {
  children: React.ReactNode
  path: string
  exact: boolean
}
export const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {
  const { user } = useCustomSelector(state => state.auth)

  // user === undefined (loading)
  // user === null (no user)
  // Boolean(user) (auth user)

  // THREE STATES
  // 1. user is loading
  // 2. user is null (done loading or no token and no user) [OK]
  // 3. user is { name: ...} (done loading and there is a user) [OK]

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user === undefined) {
          return null
        }
        if (user === null) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
        return children
      }}
    />
  )
}
