import React, { FC } from 'react'
import navItemStyles from './nav-item.module.css'
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'

type TNavItem = {
  type: TIconProps['type']
  icon: (props: TIconProps) => JSX.Element
  children: React.ReactNode
}

const NavItem: FC<TNavItem> = ({ icon, type, children }) => {
  const Icon = icon
  const textColorType: string =
    type === 'primary' ? 'text_color_primary' : 'text_color_inactive'
  return (
    <div className={`pt-4 pr-5 pb-4 pl-5 ${navItemStyles.item}`}>
      <Icon type={type} />
      <p className={`text text_type_main-default ${textColorType} ml-2`}>
        {children}
      </p>
    </div>
  )
}

export default NavItem
