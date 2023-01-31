import React, { FC, MouseEventHandler } from 'react'
import ingredientStyles from './ingredient.module.css'
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd'
import { useCustomSelector } from '../../services/store'
import { useLocation, Link } from 'react-router-dom'
import { TIngredients } from '../../utils/types'

type TIngredient = {
  ingredient: TIngredients
  onClick: MouseEventHandler
}

const Ingredient: FC<TIngredient> = ({ ingredient, onClick }) => {
  const location = useLocation()
  const [, dragRef] = useDrag({
    type: 'ingredients',
    item: ingredient,
  })
  const { ingredients: constructorIngredients, bunId } = useCustomSelector(
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
      <Link
        to={{
          pathname: `ingredients/${ingredient._id}`,
          state: { background: location },
        }}
        className={ingredientStyles.link}
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
      </Link>
    </div>
  )
}

export default Ingredient
