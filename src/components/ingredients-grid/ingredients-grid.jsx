import { INGREDIENT_TYPES } from '../../utils/utils'
import React from 'react'
import ingredientsGridStyles from './ingredients-grid.module.css'
import Ingredient from '../ingredient'
import Modal from '../modal'
import IngredientDetails from '../ingredient-details'
import { useDispatch, useSelector } from 'react-redux'
import { selectIngredients } from '../../services/reducers'
import {
  HIDE_INGREDIENT_DETAILS,
  SHOW_INGREDIENT_DETAILS,
} from '../../services/actions'

const IngredientsGrid = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const ingredients = useSelector(selectIngredients)
  const clickedIngredientId = useSelector(
    store => store.ingredientDetails.clickedIngredientID,
  )

  const buns = React.useMemo(() => {
    return ingredients.filter(item => item.type === INGREDIENT_TYPES.BUN)
  }, [ingredients])
  const mains = React.useMemo(() => {
    return ingredients.filter(item => item.type === INGREDIENT_TYPES.MAIN)
  }, [ingredients])
  const sauces = React.useMemo(() => {
    return ingredients.filter(item => item.type === INGREDIENT_TYPES.SAUCE)
  }, [ingredients])

  return (
    <>
      <h2
        className={`text text_type_main-medium text_color_primary`}
        id={props.type}
      >
        {props.text}
      </h2>
      <div
        className={`mb-10 ${ingredientsGridStyles.grid}`}
        ref={ref}
      >
        {[...buns, ...sauces, ...mains]
          .filter(ingredient => {
            return ingredient.type === props.type
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
      </div>
      {clickedIngredientId != null && (
        <Modal
          closeModal={() => {
            dispatch({ type: HIDE_INGREDIENT_DETAILS })
          }}
        >
          <IngredientDetails
            ingredient={ingredients.find(item => {
              return item._id === clickedIngredientId
            })}
          />
        </Modal>
      )}
    </>
  )
})

export default IngredientsGrid
