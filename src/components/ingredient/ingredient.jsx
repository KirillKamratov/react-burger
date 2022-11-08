import React from 'react'
import ingredientStyles from './ingredient.module.css'
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { ingredientPropTypes } from '../../utils/propTypes'
import { useDrag } from 'react-dnd'
import { useSelector } from 'react-redux'

function Ingredient({ ingredient, onClick }) {
  const [, dragRef] = useDrag({
    type: 'ingredients',
    item: ingredient,
  })
  const { ingredients: constructorIngredients, bunId } = useSelector(
    store => store.burgerConstructor,
  )

  let count = 0

  if (ingredient._id === bunId) {
    count = 2
  }

  constructorIngredients.forEach(ing => {
    if (ingredient._id === ing._id) {
      count += 1
    }
  })

  return (
    <div
      ref={dragRef}
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
        src={ingredient.image}
        className={`mt-1 mb-1 ${ingredientStyles.image}`}
        alt={ingredient.name}
      />
      <p className={ingredientStyles.price}>
        <span className='text text_type_digits-default'>
          {ingredient.price}
        </span>
        <CurrencyIcon type='primary' />
      </p>
      <p className={`${ingredientStyles.text} text text_type_main-default`}>
        {ingredient.name}
      </p>
    </div>
  )
}

Ingredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Ingredient
