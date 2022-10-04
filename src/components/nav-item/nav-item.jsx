import PropTypes from 'prop-types'
import React from 'react'
import navItemStyles from './nav-item.module.css'

class NavItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const Icon = this.props.icon
    const textColorType =
      this.props.type === 'primary'
        ? 'text_color_primary'
        : 'text_color_inactive'
    return (
      <a
        className={`pt-4 pr-5 pb-4 pl-5 ${navItemStyles.item}`}
        href='#'
      >
        <Icon type={this.props.type} />
        <p className={`text text_type_main-default ${textColorType} ml-2`}>
          {this.props.children}
        </p>
      </a>
    )
  }
}

NavItem.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
}

export default NavItem
