import React, { FC } from 'react'
import ordersHistoryStyles from './orders-history.module.css'
import Order from '../order'
import { useCustomSelector, useCustomDispatch } from '../../services/store'
import {
  closeWebSocket,
  startWebSocketWithToken,
} from '../../services/actions/webSocket'
import { getAccessToken } from '../../utils/auth'

const OrdersHistory = () => {
  const { orders } = useCustomSelector(state => state.webSocket)
  const dispatch = useCustomDispatch()

  React.useEffect(() => {
    dispatch(startWebSocketWithToken(getAccessToken().split('Bearer ')[1]))
    return () => {
      dispatch(closeWebSocket())
    }
  }, [dispatch])

  return (
    <ul className={ordersHistoryStyles.list}>
      {orders.length > 0 &&
        [...orders].reverse().map(order => {
          return (
            <Order
              key={order._id}
              {...order}
            />
          )
        })}
    </ul>
  )
}

export default OrdersHistory
