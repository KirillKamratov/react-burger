import statusScreenStyles from './status-screen.module.css'
import React from 'react'
import { useSelector } from 'react-redux'

const StatusScreen = () => {
  const { orders, totalToday, total } = useSelector(state => state.webSocket)
  const done = orders.filter(order => order.status === 'done')
  const inProgress = orders.filter(order => order.status !== 'done')
  return (
    <div className={statusScreenStyles.stats}>
      <div className={statusScreenStyles.progress}>
        <div className={statusScreenStyles.orders}>
          <h2 className={'text text_type_main-medium mb-6'}>Готовы:</h2>
          <ul className={statusScreenStyles.numbers}>
            {done.slice(0, 5).map(order => {
              return (
                <li
                  className={`text text_type_digits-default mb-2 ${statusScreenStyles.ready}`}
                  key={order._id}
                >
                  {order.number}
                </li>
              )
            })}
          </ul>
        </div>
        <div className={statusScreenStyles.orders}>
          <h2 className={'text text_type_main-medium mb-6'}>В работе:</h2>
          <ul className={statusScreenStyles.numbers}>
            {inProgress.slice(0, 5).map(order => {
              return (
                <li
                  className={`text text_type_digits-default mb-2`}
                  key={order._id}
                >
                  {order.number}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div>
        <h2 className={`text text_type_main-medium`}>
          Выполнено за все время:
        </h2>
        <p
          className={`${statusScreenStyles.totals} text text_type_digits-large`}
        >
          {total}
        </p>
      </div>
      <div>
        <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
        <p
          className={`${statusScreenStyles.totals} text text_type_digits-large`}
        >
          {totalToday}
        </p>
      </div>
    </div>
  )
}

export default StatusScreen
