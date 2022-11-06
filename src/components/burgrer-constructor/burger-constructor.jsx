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
  const { ingredients: constructorIngredients, bunId } = useSelector(
    store => store.burgerConstructor,
  )

  console.log(constructorIngredients)

  const ingredients = constructorIngredients.map(ingredient => {
    const serverIngredient = serverIngredients.find(
      ing => ing._id === ingredient.ingredientId,
    )
    return {
      uuid: ingredient.uuid,
      ...serverIngredient,
    }
  })

  console.log(ingredients)

  const bun = React.useMemo(() => {
    return serverIngredients.find(ingredient => ingredient._id === bunId)
  }, [constructorIngredients, bunId])

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

  const isEmpty = ingredients.length === 0 && bunId === null

  return (
    <section
      className={`pt-25`}
      ref={dropRef}
    >
      {isEmpty ? (
        <p className={'text text_color_primary text_type_main-large'}>
          Перетащите ингредиент
        </p>
      ) : (
        <ul className={`${burgerConstructorStyles.container}`}>
          {bun && (
            <li className={`pl-8 pr-4 mb-4 ${burgerConstructorStyles.item}`}>
              <ConstructorElement
                type='top'
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image_mobile}
              />
            </li>
          )}
          <ul className={`${burgerConstructorStyles.list}`}>
            {ingredients.map((ingredient, index) => {
              return (
                <ConstructorIngredient
                  ingredient={ingredient}
                  index={index}
                  key={ingredient.uuid}
                />
              )
            })}
          </ul>
          {bun && (
            <li className={`pl-8 pr-4 mb-4 ${burgerConstructorStyles.item}`}>
              <ConstructorElement
                type='bottom'
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image_mobile}
              />
            </li>
          )}
        </ul>
      )}
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
    </section>
  )
}

export default BurgerConstructor
