import React from 'react'
import headerStyles from './header.module.css'
import NavItem from '../nav-item'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
console.log(window.location.pathname)

function Header() {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.navigation}>
        <ul className={headerStyles.list}>
          <li className={headerStyles.item}>
            <Link
              to={'/'}
              className={headerStyles.link}
            >
              <NavItem
                type={
                  window.location.pathname === '/' ? 'primary' : 'secondary'
                }
                icon={BurgerIcon}
              >
                Конструктор
              </NavItem>
            </Link>
            <NavItem
              type={'secondary'}
              icon={ListIcon}
            >
              Лента заказов
            </NavItem>
          </li>
          <li className={headerStyles.item}>
            <Logo />
          </li>
          <li className={headerStyles.item}>
            <Link
              to={'/profile'}
              className={headerStyles.link}
            >
              <NavItem
                type={
                  window.location.pathname === '/profile' ||
                  '/login' ||
                  '/register' ||
                  '/forgot-password' ||
                  'reset-password'
                    ? 'primary'
                    : 'secondary'
                }
                icon={ProfileIcon}
              >
                Личный кабинет
              </NavItem>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
