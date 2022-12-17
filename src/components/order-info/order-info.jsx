import orderInfoStyles from './order-info.module.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { INGREDIENT_TYPES } from '../../utils/utils'
import React from 'react'
import { useDispatch } from 'react-redux'
import {
  startWebSocket,
  closeWebSocket,
  startWebSocketWithToken,
} from '../../services/actions/webSocket'
import { getAccessToken } from '../../utils/auth'
import { useHistory } from 'react-router-dom'

const OrderInfo = ({ inModal }) => {
  const { orders } = useSelector(state => state.webSocket)
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    if (history.location.pathname.includes('/feed')) {
      dispatch(startWebSocket())
    } else if (history.location.pathname.includes('/profile')) {
      dispatch(startWebSocketWithToken(getAccessToken().split('Bearer ')[1]))
    }
    return () => {
      dispatch(closeWebSocket())
    }
  }, [dispatch])

  const chosenOrder = orders.find(ingredient => ingredient._id === id)
  const ingredientsFromServer = useSelector(
    state => state.ingredients.ingredients,
  )

  const ingredientsInOrder = chosenOrder?.ingredients.map(id =>
    ingredientsFromServer.find(ingredient => ingredient._id === id),
  )

  const orderWithUniqueIngredients = Array.from(new Set(ingredientsInOrder))

  function getOccurrence(value) {
    let count = 0
    ingredientsInOrder.forEach(v => v._id === value && count++)
    return count
  }

  const ordersStatus = status => {
    if (status === 'done') {
      return 'Выполнен'
    } else if (status === 'pending') {
      return 'Готовится'
    } else if (status === 'created') {
      return 'Создан'
    }
  }

  const summary = ingredientsInOrder?.reduce(
    (total, ing) =>
      total + (ing.type === INGREDIENT_TYPES.BUN ? ing.price * 2 : ing.price),
    0,
  )

  return (
    <div
      className={`${orderInfoStyles.container} ${
        !inModal ? `${orderInfoStyles.self}` : ``
      }`}
    >
      <p
        className={`${
          !inModal ? `${orderInfoStyles.header}` : ``
        } text text_type_digits-default mb-10`}
      >
        #{chosenOrder?.number}
      </p>
      <h1 className={`text text_type_main-medium mb-3`}>{chosenOrder?.name}</h1>
      <p
        className={`${
          chosenOrder?.status === 'done' ? `${orderInfoStyles?.done}` : ``
        } text text_type_main-default mb-15`}
      >
        {ordersStatus(chosenOrder?.status)}
      </p>
      <p className={`text text text_type_main-medium mb-6 mr-6`}>Состав:</p>
      <ul className={`${orderInfoStyles.list} mb-10`}>
        {orderWithUniqueIngredients?.map((ingredient, index) => {
          return (
            <li
              className={orderInfoStyles.item}
              key={index}
            >
              <div className={orderInfoStyles.qwerty}>
                <div className={`${orderInfoStyles.wrapper}`}>
                  <img
                    className={orderInfoStyles.image}
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                  />
                </div>
                <p className={`text text_type_main-default`}>
                  {ingredient.name}
                </p>
              </div>
              <span
                className={`${orderInfoStyles.total} text_type_digits-default`}
              >
                <p className={`${orderInfoStyles.price}`}>
                  {getOccurrence(ingredient._id)} X {ingredient.price}
                </p>
                <CurrencyIcon type={'primary'} />
              </span>
            </li>
          )
        })}
      </ul>
      <div className={`${orderInfoStyles.footer}`}>
        <FormattedDate
          className={`text text_type_main-default text_color_inactive`}
          date={new Date(chosenOrder?.createdAt)}
        />
        <span className={`${orderInfoStyles.total} text_type_digits-default`}>
          <p className={`${orderInfoStyles.price}`}>{summary}</p>
          <CurrencyIcon type={'primary'} />
        </span>
      </div>
    </div>
  )
}

export default OrderInfo
