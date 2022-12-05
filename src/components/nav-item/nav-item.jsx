import PropTypes from 'prop-types'
import React from 'react'
import navItemStyles from './nav-item.module.css'

function NavItem({ icon, type, children }) {
  const Icon = icon
  const textColorType =
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

NavItem.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default NavItem
