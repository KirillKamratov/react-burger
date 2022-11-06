import React from 'react'
import burgerConstructorStyles from './burger-constructor.module.css'
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal'
import OrderDetails from '../order-details'
import { useDispatch, useSelector } from 'react-redux'
import {
  ADD_BUN,
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  RESET_CONSTRUCTOR,
  sendOrder,
} from '../../services/actions'
import { useDrop } from 'react-dnd'
import { selectIngredients } from '../../services/reducers'
import ConstructorIngredient from '../constructor-ingredient'
import { INGREDIENT_TYPES } from '../../utils/utils'

function BurgerConstructor() {
  const dispatch = useDispatch()
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false)
  const orderNumber = useSelector(store => store.orderDetails.orderNumber)
  const serverIngredients = useSelector(selectIngredients)
  const { ingredients: ingredientsIds, bunId } = useSelector(
    store => store.burgerConstructor,
  )

  const ingredients = ingredientsIds.map(id => {
    return serverIngredients.find(ing => ing._id === id)
  })

  const bun = React.useMemo(() => {
    return serverIngredients.find(ingredient => ingredient._id === bunId)
  }, [ingredientsIds, bunId])

  const [, dropRef] = useDrop({
    accept: 'ingredients',
    drop(ingredient) {
      if (ingredient.type === INGREDIENT_TYPES.BUN) {
        dispatch({
          type: ADD_BUN,
          bunId: ingredient._id,
        })
      } else {
        dispatch({
          type: ADD_INGREDIENT,
          payload: ingredient._id,
        })
      }
    },
  })

  const totalPrice = React.useMemo(() => {
    return ingredients.reduce(
      (total, item) => total + item.price,
      bun ? bun.price * 2 : 0,
    )
  }, [ingredients, bun])

  const order = []

  const openModal = () => {
    ingredients.forEach(ingredient => {
      order.push(ingredient._id, bunId, bunId)
    })
    dispatch(sendOrder(order))
    setIsOrderDetailsOpened(true)
  }

  const closeModal = () => {
    setIsOrderDetailsOpened(false)
    dispatch({
      type: RESET_CONSTRUCTOR,
    })
  }

  if (ingredients.length === 0 && bunId === null) {
    return null
  }
  return (
    <>
      <ul
        className={`${burgerConstructorStyles.container}`}
        ref={dropRef}
      >
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
          {ingredients.map((ingredient, index) => {
            return (
              <ConstructorIngredient
                ingredient={ingredient}
                index={index}
                key={ingredient._id + index}
              />
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
          <Modal closeModal={closeModal}>
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        )}
      </div>
    </>
  )
}

export default BurgerConstructor
