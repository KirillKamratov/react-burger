import React from 'react'
import ordersHistoryStyles from './orders-history.module.css'
import Order from '../order'
import { useDispatch, useSelector } from 'react-redux'
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from '../../services/actions/webSocket'

const OrdersHistory = () => {
  const { orders } = useSelector(state => state.webSocket)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
    })
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED })
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
