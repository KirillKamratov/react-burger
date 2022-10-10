import PropTypes from 'prop-types'
import { ingredientPropTypes } from '../../utils/propTypes'
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

function BurgerConstructor(props) {
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false)

  const openModal = () => {
    setIsOrderDetailsOpened(true)
  }

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false)
  }

  if (props.ingredients.length === 0) {
    return null
  }
  return (
    <>
      <ul className={`${burgerConstructorStyles.container}`}>
        <li className={`pl-8 pr-4 mb-4 ${burgerConstructorStyles.item}`}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${props.ingredients[0].name} верх`}
            price={props.ingredients[0].price}
            thumbnail={props.ingredients[0].image_mobile}
          />
        </li>
        <ul className={`${burgerConstructorStyles.list}`}>
          <li className={`mb-4  ${burgerConstructorStyles.item}`}>
            <DragIcon type={'primary'} />
            <ConstructorElement
              text={`${props.ingredients[0].name}`}
              price={props.ingredients[0].price}
              thumbnail={props.ingredients[0].image_mobile}
            />
          </li>
          <li className={`mb-4  ${burgerConstructorStyles.item}`}>
            <DragIcon type={'primary'} />
            <ConstructorElement
              text={`${props.ingredients[0].name}`}
              price={props.ingredients[0].price}
              thumbnail={props.ingredients[0].image_mobile}
            />
          </li>
          <li className={`mb-4  ${burgerConstructorStyles.item}`}>
            <DragIcon type={'primary'} />
            <ConstructorElement
              text={`${props.ingredients[0].name}`}
              price={props.ingredients[0].price}
              thumbnail={props.ingredients[0].image_mobile}
            />
          </li>
          <li className={`mb-4  ${burgerConstructorStyles.item}`}>
            <DragIcon type={'primary'} />
            <ConstructorElement
              text={`${props.ingredients[0].name}`}
              price={props.ingredients[0].price}
              thumbnail={props.ingredients[0].image_mobile}
            />
          </li>
          <li className={`mb-4  ${burgerConstructorStyles.item}`}>
            <DragIcon type={'primary'} />
            <ConstructorElement
              text={`${props.ingredients[0].name}`}
              price={props.ingredients[0].price}
              thumbnail={props.ingredients[0].image_mobile}
            />
          </li>
        </ul>
        <li className={`pl-8 pr-4 mb-4 ${burgerConstructorStyles.item}`}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${props.ingredients[0].name} низ`}
            price={props.ingredients[0].price}
            thumbnail={props.ingredients[0].image_mobile}
          />
        </li>
      </ul>
      <div className={`${burgerConstructorStyles.summary} mt-10 mr-4`}>
        <p
          className={`mr-10 text text_color_primary text_type_digits-medium
             ${burgerConstructorStyles.price}`}
        >
          <span>610</span>
          <CurrencyIcon type='primary' />
        </p>
        <Button
          onClick={openModal}
          htmlType={'button'}
          type='primary'
          size='large'
        >
          Оформить заказ
        </Button>
        {isOrderDetailsOpened && (
          <Modal closeModal={closeAllModals}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
}

export default BurgerConstructor
