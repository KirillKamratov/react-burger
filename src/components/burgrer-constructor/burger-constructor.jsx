import React from 'react'
import burgerConstructorStyles from './burger-constructor.module.css'
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import data from '../../utils/data'

class BurgerConstructor extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <ul className={`${burgerConstructorStyles.container}`}>
          <li className={`pl-8 pr-4 mb-4 ${burgerConstructorStyles.item}`}>
            <ConstructorElement
              type='top'
              isLocked={true}
              text={`${data[0].name} верх`}
              price={data[0].price}
              thumbnail={data[0].image_mobile}
            />
          </li>
          <ul className={`${burgerConstructorStyles.list}`}>
            <li className={`mb-4  ${burgerConstructorStyles.item}`}>
              <DragIcon type={'primary'} />
              <ConstructorElement
                text={`${data[0].name}`}
                price={data[0].price}
                thumbnail={data[0].image_mobile}
              />
            </li>
            <li className={`mb-4  ${burgerConstructorStyles.item}`}>
              <DragIcon type={'primary'} />
              <ConstructorElement
                text={`${data[0].name}`}
                price={data[0].price}
                thumbnail={data[0].image_mobile}
              />
            </li>
            <li className={`mb-4  ${burgerConstructorStyles.item}`}>
              <DragIcon type={'primary'} />
              <ConstructorElement
                text={`${data[0].name}`}
                price={data[0].price}
                thumbnail={data[0].image_mobile}
              />
            </li>
            <li className={`mb-4  ${burgerConstructorStyles.item}`}>
              <DragIcon type={'primary'} />
              <ConstructorElement
                text={`${data[0].name}`}
                price={data[0].price}
                thumbnail={data[0].image_mobile}
              />
            </li>
            <li className={`mb-4  ${burgerConstructorStyles.item}`}>
              <DragIcon type={'primary'} />
              <ConstructorElement
                text={`${data[0].name}`}
                price={data[0].price}
                thumbnail={data[0].image_mobile}
              />
            </li>
          </ul>
          <li className={`pl-8 pr-4 mb-4 ${burgerConstructorStyles.item}`}>
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={`${data[0].name} низ`}
              price={data[0].price}
              thumbnail={data[0].image_mobile}
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
            htmlType={'button'}
            type='primary'
            size='large'
          >
            Оформить заказ
          </Button>
        </div>
      </>
    )
  }
}

export default BurgerConstructor
