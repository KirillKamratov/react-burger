import ingredientDetailsStyles from './ingredient-details.module.css'
import { useParams } from 'react-router-dom'
import { useCustomSelector } from '../../services/store'
import React, { FC } from 'react'

const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { ingredients } = useCustomSelector(store => store.ingredients)
  const currentIngredient = ingredients.find(
    ingredient => ingredient._id === id,
  )
  return (
    <>
      <h2
        className={`${ingredientDetailsStyles.title} text text_type_main-large mt-15 ml-10 mr-10`}
      >
        Детали ингредиента
      </h2>
      <div className={ingredientDetailsStyles.ingredient}>
        <img
          src={currentIngredient?.image_large}
          alt={currentIngredient?.name}
        />
        <h3 className='text text_type_main-medium mt-4 mb-8'>
          {currentIngredient?.name}
        </h3>
        <ul className={ingredientDetailsStyles.list + ' mb-15'}>
          <li className={ingredientDetailsStyles.item}>
            <h4 className='text text_type_main-default text_color_inactive'>
              Калории,ккал
            </h4>
            <p className='text text_type_digits-default text_color_inactive'>
              {currentIngredient?.calories}
            </p>
          </li>
          <li className={ingredientDetailsStyles.item + ' ml-5'}>
            <h4 className='text  text_type_main-default text_color_inactive'>
              Белки, г
            </h4>
            <p className='text text_type_digits-default text_color_inactive'>
              {currentIngredient?.proteins}
            </p>
          </li>
          <li className={ingredientDetailsStyles.item + ' ml-5'}>
            <h4 className='text  text_type_main-default text_color_inactive'>
              Жиры, г
            </h4>
            <p className='text text_type_digits-default text_color_inactive'>
              {currentIngredient?.fat}
            </p>
          </li>
          <li className={ingredientDetailsStyles.item + ' ml-5'}>
            <h4 className='text text_type_main-default text_color_inactive'>
              Углеводы, г
            </h4>
            <p className='text text_type_digits-default text_color_inactive'>
              {currentIngredient?.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  )
}

export default IngredientDetails
