import feedStyles from './feed.module.css'
import React, { FC } from 'react'
import { useCustomDispatch, useCustomSelector } from '../../services/store'
import Order from '../../components/order'
import StatusScreen from '../../components/status-screen'
import {
  closeWebSocket,
  startWebSocket,
} from '../../services/actions/webSocket'

const Feed: FC = () => {
  const { orders } = useCustomSelector(state => state.webSocket)
  const dispatch = useCustomDispatch()

  React.useEffect(() => {
    dispatch(startWebSocket())
    return () => {
      dispatch(closeWebSocket())
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
