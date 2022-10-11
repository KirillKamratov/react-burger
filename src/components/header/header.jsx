import React from 'react'
import headerStyles from './header.module.css'
import NavItem from '../nav-item'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

function Header() {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.navigation}>
        <ul className={headerStyles.list}>
          <li className={headerStyles.item}>
            <NavItem
              type='primary'
              icon={BurgerIcon}
            >
              Конструктор
            </NavItem>
            <NavItem
              type='secondary'
              icon={ListIcon}
            >
              Лента заказов
            </NavItem>
          </li>
          <li className={headerStyles.item}>
            <Logo />
          </li>
          <li className={headerStyles.item}>
            <NavItem
              type='secondary'
              icon={ProfileIcon}
            >
              Личный кабинет
            </NavItem>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
