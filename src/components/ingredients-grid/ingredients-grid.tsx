import { INGREDIENT_TYPES } from '../../utils/utils'
import React, { FC, ForwardedRef, forwardRef } from 'react'
import ingredientsGridStyles from './ingredients-grid.module.css'
import Ingredient from '../ingredient'
import { selectIngredients } from '../../services/reducers'
import { SHOW_INGREDIENT_DETAILS } from '../../services/actions/ingredient'
import { useCustomDispatch, useCustomSelector } from '../../services/store'

type TIngredientsGrid = {
  type: string
  text: string
  ref?: ForwardedRef<HTMLUListElement>
}

const IngredientsGrid: FC<TIngredientsGrid> = forwardRef(
  ({ type, text }, ref: ForwardedRef<HTMLUListElement>) => {
    const dispatch = useCustomDispatch()
    const ingredients = useCustomSelector(selectIngredients)

    const buns = React.useMemo(() => {
      return ingredients.filter(
        (item: { type: string }) => item.type === INGREDIENT_TYPES.BUN,
      )
    }, [ingredients])
    const mains = React.useMemo(() => {
      return ingredients.filter(
        (item: { type: string }) => item.type === INGREDIENT_TYPES.MAIN,
      )
    }, [ingredients])
    const sauces = React.useMemo(() => {
      return ingredients.filter(
        (item: { type: string }) => item.type === INGREDIENT_TYPES.SAUCE,
      )
    }, [ingredients])

    return (
      <>
        <h2
          className={`text text_type_main-medium text_color_primary`}
          id={type}
        >
          {text}
        </h2>
        <ul
          className={`mb-10 ${ingredientsGridStyles.grid}`}
          ref={ref}
        >
          {[...buns, ...sauces, ...mains]
            .filter(ingredient => {
              return ingredient.type === type
            })
            .map((ingredient, key) => {
              return (
                <Ingredient
                  ingredient={ingredient}
                  key={ingredient._id}
                  onClick={() => {
                    dispatch({
                      type: SHOW_INGREDIENT_DETAILS,
                      ingredientID: ingredient._id,
                    })
                  }}
                />
              )
            })}
        </ul>
      </>
    )
  },
)

export default IngredientsGrid
