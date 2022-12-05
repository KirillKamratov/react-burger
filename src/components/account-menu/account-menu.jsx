import accountMenuStyles from './account-menu.module.css'
import { NavLink, useHistory } from 'react-router-dom'
import React from 'react'
import { logout } from '../../services/actions/auth'
import { useDispatch, useSelector } from 'react-redux'

const AccountMenu = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector(state => state.auth)

  const handleLogOut = () => {
    if (!user) {
      history.push('/login')
    }
    dispatch(logout())
  }
  return (
    <section>
      <nav className={`mr-15 ${accountMenuStyles.menu}`}>
        <NavLink
          to={'/profile'}
          exact
          className={`text text_type_main-medium ${accountMenuStyles.link}`}
          activeClassName={accountMenuStyles.active}
        >
          Профиль
        </NavLink>
        <NavLink
          to={'/profile/orders'}
          exact
          className={`text text_type_main-medium ${accountMenuStyles.link}`}
          activeClassName={accountMenuStyles.active}
        >
          История заказов
        </NavLink>
        <NavLink
          to={'/login'}
          className={`text text_type_main-medium ${accountMenuStyles.link}`}
          onClick={handleLogOut}
        >
          Выход
        </NavLink>
        <p
          className={`mt-20 text text_type_main-default text_color_inactive ${accountMenuStyles.info}`}
        >
          В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
        </p>
      </nav>
    </section>
  )
}

export default AccountMenu
