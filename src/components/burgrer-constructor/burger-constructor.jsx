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
import { IngredientContext } from '../../providers/ingredientContext'
import { INGREDIENT_TYPES } from '../../utils/utils'
import { sendOrder } from '../../utils/api'

function BurgerConstructor() {
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false)
  const [orderInfo, setOrderInfo] = React.useState({ orderNumber: '' })
  const ingredients = React.useContext(IngredientContext)

  const bun = ingredients.find(item => {
    return item.type === INGREDIENT_TYPES.BUN
  })

  const order = [bun]

  const cart = ingredients.map(item => {
    return item._id
  })

  const openModal = () => {
    sendOrder(cart, setOrderInfo)
    setIsOrderDetailsOpened(true)
  }

  const closeAllModals = () => {
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
            text={`${bun.name} верх`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </li>
        <ul className={`${burgerConstructorStyles.list}`}>
          {ingredients.map(item => {
            if (item.type !== INGREDIENT_TYPES.BUN) {
              order.push(item)
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
            }
          })}
        </ul>
        <li className={`pl-8 pr-4 mb-4 ${burgerConstructorStyles.item}`}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bun.name} низ`}
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
          <span>
            {ingredients.reduce((total, item) => total + item.price, 0)}
          </span>
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
          <Modal closeModal={closeAllModals}>
            <OrderDetails orderInfo={orderInfo} />
          </Modal>
        )}
      </div>
    </>
  )
}

export default BurgerConstructor
