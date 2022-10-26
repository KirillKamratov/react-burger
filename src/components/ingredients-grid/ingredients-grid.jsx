import { INGREDIENT_TYPES } from '../../utils/utils'
import React from 'react'
import ingredientsGridStyles from './ingredients-grid.module.css'
import Ingredient from '../ingredient'
import Modal from '../modal'
import IngredientDetails from '../ingredient-details'
import { IngredientContext } from '../../services/ingredientContext'

function IngredientsGrid(props) {
  const ingredients = React.useContext(IngredientContext)
  const [clickedIngredientId, setClickedIngredientId] = React.useState(null)

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
        className={`'text text_type_main-medium text_color_primary'`}
        id={props.type}
      >
        {props.text}
      </h2>
      <div className={`mb-10 ${ingredientsGridStyles.grid}`}>
        {[...buns, ...sauces, ...mains]
          .filter(ingredient => {
            return ingredient.type === props.type
          })
          .map((ingredient, key) => {
            return (
              <Ingredient
                card={ingredient}
                key={ingredient._id}
                onClick={() => {
                  setClickedIngredientId(ingredient._id)
                }}
              />
            )
          })}
      </div>
      {clickedIngredientId != null && (
        <Modal
          closeModal={() => {
            setClickedIngredientId(null)
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
}

export default IngredientsGrid
