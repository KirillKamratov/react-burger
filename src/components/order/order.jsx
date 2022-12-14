import orderStyles from './order.module.css'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import { INGREDIENT_TYPES } from '../../utils/utils'

const Order = props => {
  const { _id, createdAt, number, name, status, ingredients } = props
  const ingredientsFromServer = useSelector(
    state => state.ingredients.ingredients,
  )
  const location = useLocation()

  const ordersStatus = orderStatus => {
    if (orderStatus === 'done') {
      return 'Выполнен'
    } else if (orderStatus === 'pending') {
      return 'Готовится'
    } else if (orderStatus === 'created') {
      return 'Создан'
    }
  }

  const ingredientsInOrder = ingredients.map(
    id =>
      id !== null &&
      ingredientsFromServer.find(ingredient => ingredient._id === id),
  )

  const summary = ingredientsInOrder.reduce(
    (total, ing) =>
      total + (ing.type === INGREDIENT_TYPES.BUN ? ing.price * 2 : ing.price),
    0,
  )

  const orderWithUniqueIngredients = Array.from(new Set(ingredientsInOrder))

  return (
    <li className={`${orderStyles.order} mr-2`}>
      <Link
        className={orderStyles.link}
        to={{
          pathname: `${location.pathname}/${_id}`,
          state: { background: location },
        }}
      >
        <div className={orderStyles.number}>
          <p className={`text text_type_digits-default mb-6`}>{`#${number}`}</p>
          <FormattedDate
            className={`text text_type_main-default text_color_inactive`}
            date={new Date(createdAt)}
          />
        </div>
        <div>
          <p className={`text text_type_main-medium mb-2`}>{name}</p>
          {window.location.pathname.endsWith('/orders') ? (
            <p
              className={`${
                ordersStatus(status) === 'Выполнен' ? `${orderStyles.done}` : ``
              }  text text_type_main-default`}
            >
              {ordersStatus(status)}
            </p>
          ) : null}
        </div>
        <div className={`${orderStyles.total} mt-6`}>
          <ul className={orderStyles.recipe}>
            {orderWithUniqueIngredients.slice(0, 6).map((ingredient, index) => {
              if (index < 5) {
                return (
                  <li
                    key={index}
                    className={orderStyles.image}
                  >
                    <img
                      src={ingredient.image_mobile}
                      alt='ingredient'
                    />
                  </li>
                )
              } else {
                return (
                  <li
                    key={index}
                    className={orderStyles.image}
                  >
                    <img
                      className={orderStyles.transparent}
                      src={ingredient.image_mobile}
                      alt='ingredient'
                    />
                    <span
                      className={`${orderStyles.rest}
                    text text_type_main-default`}
                    >{`+${orderWithUniqueIngredients.length - 5}`}</span>
                  </li>
                )
              }
            })}
          </ul>
          <span
            className={`${orderStyles.price} text text_type_digits-default ml-6`}
          >
            <p className={orderStyles.sum}>{summary}</p>
            <CurrencyIcon type={'primary'} />
          </span>
        </div>
      </Link>
    </li>
  )
}

export default Order
