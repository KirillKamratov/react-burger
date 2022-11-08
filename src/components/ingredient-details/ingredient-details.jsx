import ingredientDetailsStyles from './ingredient-details.module.css'
import { ingredientPropTypes } from '../../utils/propTypes'

function IngredientDetails({ ingredient }) {
  return (
    <>
      <h2 className='text text_type_main-large mt-15 ml-10 mr-10'>
        Детали ингредиента
      </h2>
      <div className={ingredientDetailsStyles.ingredient}>
        <img
          src={ingredient.image_large}
          alt={ingredient.name}
        />
        <h3 className='text text_type_main-medium mt-4 mb-8'>
          {ingredient.name}
        </h3>
        <ul className={ingredientDetailsStyles.list + ' mb-15'}>
          <li className={ingredientDetailsStyles.item}>
            <h4 className='text text_type_main-default text_color_inactive'>
              Калории,ккал
            </h4>
            <p className='text text_type_digits-default text_color_inactive'>
              {ingredient.calories}
            </p>
          </li>
          <li className={ingredientDetailsStyles.item + ' ml-5'}>
            <h4 className='text  text_type_main-default text_color_inactive'>
              Белки, г
            </h4>
            <p className='text text_type_digits-default text_color_inactive'>
              {ingredient.proteins}
            </p>
          </li>
          <li className={ingredientDetailsStyles.item + ' ml-5'}>
            <h4 className='text  text_type_main-default text_color_inactive'>
              Жиры, г
            </h4>
            <p className='text text_type_digits-default text_color_inactive'>
              {ingredient.fat}
            </p>
          </li>
          <li className={ingredientDetailsStyles.item + ' ml-5'}>
            <h4 className='text text_type_main-default text_color_inactive'>
              Углеводы, г
            </h4>
            <p className='text text_type_digits-default text_color_inactive'>
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  )
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
}

export default IngredientDetails
