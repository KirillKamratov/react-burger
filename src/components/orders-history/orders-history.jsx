import React from 'react'
import ordersHistoryStyles from './orders-history.module.css'
import Order from '../order'
import { useDispatch, useSelector } from 'react-redux'
import {
  closeWebSocket,
  startWebSocketWithToken,
} from '../../services/actions/webSocket'
import { getAccessToken } from '../../utils/auth'

const OrdersHistory = () => {
  const { orders } = useSelector(state => state.webSocket)
  const dispatch = useDispatch()

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
