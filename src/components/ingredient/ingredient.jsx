import React from 'react'
import ingredientStyles from './ingredient.module.css'
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { ingredientPropTypes } from '../../utils/propTypes'

function Ingredient({ card, onClick }) {
  let count

  return (
    <div
      className={ingredientStyles.item}
      onClick={onClick}
    >
      {count > 0 && (
        <Counter
          count={count}
          size='default'
        />
      )}
      <img
        src={card.image}
        className={`mt-1 mb-1 ${ingredientStyles.image}`}
        alt={card.name}
      />
      <p className={ingredientStyles.price}>
        <span className='text text_type_digits-default'>{card.price}</span>
        <CurrencyIcon type='primary' />
      </p>
      <p className={`${ingredientStyles.text} text text_type_main-default`}>
        {card.name}
      </p>
    </div>
  )
}

Ingredient.propTypes = {
  card: ingredientPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Ingredient
