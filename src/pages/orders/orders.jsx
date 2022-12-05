import React from 'react'
import AccountMenu from '../../components/account-menu'
import OrdersHistory from '../../components/orders-history'
import basicPagesStyles from '../basicPagesStyles.module.css'

const Orders = () => {
  return (
    <main className={basicPagesStyles.container}>
      <AccountMenu />
      <OrdersHistory />
    </main>
  )
}

export default Orders
