import ingredientStyles from './ingredient.module.css'
import IngredientDetails from '../../components/ingredient-details'

const Ingredient = () => {
  return (
    <main className={ingredientStyles.main}>
      <IngredientDetails />
    </main>
  )
}

export default Ingredient
