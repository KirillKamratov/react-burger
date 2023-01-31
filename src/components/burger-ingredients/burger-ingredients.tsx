import React from 'react'
import burgerIngredientsStyles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { INGREDIENT_TYPES } from '../../utils/utils'
import IngredientsGrid from '../ingredients-grid'
import { useInView } from 'react-intersection-observer'

function BurgerIngredients() {
  const [category, setCategory] = React.useState(INGREDIENT_TYPES.BUN)

  const handleValueSwitch = (value: string) => {
    setCategory(value)
  }

  const options = {
    threshold: 0,
    delay: 100,
  }

  const [bunsRef, inViewBuns] = useInView(options)
  const [mainsRef, inViewMains] = useInView(options)
  const [saucesRef, inViewSauces] = useInView(options)

  React.useEffect(() => {
    if (inViewBuns) {
      setCategory(INGREDIENT_TYPES.BUN)
    } else if (inViewSauces) {
      setCategory(INGREDIENT_TYPES.SAUCE)
    } else if (inViewMains) {
      setCategory(INGREDIENT_TYPES.MAIN)
    }
  }, [inViewBuns, inViewSauces, inViewMains])

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
                active={category === INGREDIENT_TYPES.BUN}
                onClick={handleValueSwitch}
                value={INGREDIENT_TYPES.BUN}
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
                active={category === INGREDIENT_TYPES.SAUCE}
                onClick={handleValueSwitch}
                value={INGREDIENT_TYPES.SAUCE}
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
                active={category === INGREDIENT_TYPES.MAIN}
                onClick={handleValueSwitch}
                value={INGREDIENT_TYPES.MAIN}
              >
                Начинки
              </Tab>
            </a>
          </li>
        </ul>
      </nav>
      <ul className={`${burgerIngredientsStyles.list}`}>
        <li>
          <IngredientsGrid
            type={INGREDIENT_TYPES.BUN}
            text='Булки'
            ref={bunsRef}
          />
        </li>
        <li>
          <IngredientsGrid
            type={INGREDIENT_TYPES.SAUCE}
            text='Соусы'
            ref={saucesRef}
          />
        </li>
        <li>
          <IngredientsGrid
            type={INGREDIENT_TYPES.MAIN}
            text='Начинки'
            ref={mainsRef}
          />
        </li>
      </ul>
    </>
  )
}

export default BurgerIngredients
