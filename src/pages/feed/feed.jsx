import feedStyles from './feed.module.css'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from '../../services/actions/webSocket'
import Order from '../../components/order'
import StatusScreen from '../../components/status-screen'

const Feed = () => {
  const { orders } = useSelector(state => state.webSocket)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      user: false,
    })
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED })
    }
  }, [dispatch])

  return (
    <main className={feedStyles.main}>
      <h1 className={`mt-10 mb-5 text text_color_primary text_type_main-large`}>
        Лента заказов
      </h1>
      <div className={feedStyles.container}>
        <ul className={`${feedStyles.list}`}>
          {orders.map(order => {
            return (
              <Order
                key={order._id}
                {...order}
              />
            )
          })}
        </ul>
        <StatusScreen />
      </div>
    </main>
  )
}

export default Feed
