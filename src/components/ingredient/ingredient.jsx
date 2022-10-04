import React from 'react'
import ingredientStyles from './ingredient.module.css'
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

class Ingredient extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={ingredientStyles.item}>
        <Counter
          count={0}
          size='default'
        />
        <img
          src={this.props.card.image}
          className={`mt-1 mb-1 ${ingredientStyles.image}`}
          alt={this.props.card.name}
        />
        <p className={ingredientStyles.price}>
          <span className='text text_type_digits-default'>
            {this.props.card.price}
          </span>
          <CurrencyIcon type='primary' />
        </p>
        <p className={`${ingredientStyles.text} text text_type_main-default`}>
          {this.props.card.name}
        </p>
      </div>
    )
  }
}

export default Ingredient
