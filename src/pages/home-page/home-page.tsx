import homePageStyles from './home-page.module.css'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BurgerIngredients from '../../components/burger-ingredients'
import BurgerConstructor from '../../components/burgrer-constructor'
import { DndProvider } from 'react-dnd'
import React, { FC } from 'react'

const HomePage: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={homePageStyles.main}>
        <section className={`${homePageStyles.constructor}`}>
          <BurgerIngredients />
        </section>
        <BurgerConstructor />
      </main>
    </DndProvider>
  )
}

export default HomePage
