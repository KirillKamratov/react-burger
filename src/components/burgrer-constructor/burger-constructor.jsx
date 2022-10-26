import React from 'react'
import burgerConstructorStyles from './burger-constructor.module.css'
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal'
import OrderDetails from '../order-details'
import { IngredientContext } from '../../services/ingredientContext'
import { INGREDIENT_TYPES } from '../../utils/utils'
import { isOk, ORDER_URL } from '../../utils/api'

function BurgerConstructor() {
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false)
  const [orderInfo, setOrderInfo] = React.useState({ orderNumber: '' })
  const ingredients = React.useContext(IngredientContext)

  const bun = React.useMemo(() => {
    return ingredients.find(item => item.type === INGREDIENT_TYPES.BUN)
  }, [ingredients])

  const ingredientsWithoutBuns = React.useMemo(() => {
    return ingredients.filter(item => item.type !== INGREDIENT_TYPES.BUN)
  }, [ingredients])

  const totalPrice = React.useMemo(() => {
    return ingredients.reduce((total, item) => total + item.price, 0)
  }, [ingredients])

  const order = [bun]

  const openModal = () => {
    fetch(ORDER_URL, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: order,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(isOk)
      .then(data => {
        setOrderInfo({ orderNumber: data.order.number })
      })
      .catch(error => {
        console.log(error.message)
      })
    setIsOrderDetailsOpened(true)
  }

  const closeOrderModal = () => {
    setIsOrderDetailsOpened(false)
  }

  if (ingredients.length === 0) {
    return null
  }
  return (
    <>
      <ul className={`${burgerConstructorStyles.container}`}>
        <li className={`pl-8 pr-4 mb-4 ${burgerConstructorStyles.item}`}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </li>
        <ul className={`${burgerConstructorStyles.list}`}>
          {ingredientsWithoutBuns.map(item => {
            return (
              <li
                className={`mb-4  ${burgerConstructorStyles.item}`}
                key={item._id}
              >
                <DragIcon type='primary' />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile}
                />
              </li>
            )
          })}
        </ul>
        <li className={`pl-8 pr-4 mb-4 ${burgerConstructorStyles.item}`}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </li>
      </ul>
      <div className={`${burgerConstructorStyles.summary} mt-10 mr-4`}>
        <p
          className={`mr-10 text text_color_primary text_type_digits-medium
             ${burgerConstructorStyles.price}`}
        >
          <span>{totalPrice}</span>
          <CurrencyIcon type='primary' />
        </p>
        <Button
          onClick={openModal}
          htmlType='button'
          type='primary'
          size='large'
        >
          Оформить заказ
        </Button>
        {isOrderDetailsOpened && (
          <Modal closeModal={closeOrderModal}>
            <OrderDetails orderInfo={orderInfo} />
          </Modal>
        )}
      </div>
    </>
  )
}

export default BurgerConstructor
