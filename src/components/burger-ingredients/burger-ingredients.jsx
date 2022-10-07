import React from 'react'
import burgerIngredientsStyles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsGrid from '../ingredients-grid'

function BurgerIngredients() {
  const [state, setState] = React.useState('Булки')

  const handleValueSwitch = value => {
    setState(value)
  }

  return (
    <>
      <h1 className={`mt-10 mb-5 text text_color_primary text_type_main-large`}>
        Соберите Бургер
      </h1>
      <nav className={`mb-10`}>
        <ul className={`${burgerIngredientsStyles.menu}`}>
          <li>
            <a
              className={burgerIngredientsStyles.button}
              href='#bun'
            >
              <Tab
                active={state.value === 'Булки'}
                onClick={handleValueSwitch}
                value={'Булки'}
              >
                Булки
              </Tab>
            </a>
          </li>
          <li>
            <a
              className={burgerIngredientsStyles.button}
              href='#sauce'
            >
              <Tab
                active={state.value === 'Соусы'}
                onClick={handleValueSwitch}
                value={'Соусы'}
              >
                Соусы
              </Tab>
            </a>
          </li>
          <li>
            <a
              className={burgerIngredientsStyles.button}
              href='#main'
            >
              <Tab
                active={state.value === 'Начинки'}
                onClick={handleValueSwitch}
                value={'Начинки'}
              >
                Начинки
              </Tab>
            </a>
          </li>
        </ul>
      </nav>
      <ul className={`${burgerIngredientsStyles.list}`}>
        <li className={burgerIngredientsStyles.item}>
          <IngredientsGrid
            type='bun'
            text='Булки'
          />
        </li>
        <li className={burgerIngredientsStyles.item}>
          <IngredientsGrid
            type='sauce'
            text='Соусы'
          />
        </li>
        <li className={burgerIngredientsStyles.item}>
          <IngredientsGrid
            type='main'
            text='Начинки'
          />
        </li>
      </ul>
    </>
  )
}

export default BurgerIngredients
