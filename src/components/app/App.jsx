import React from 'react'
import AppStyles from './App.module.css'
import Header from '../header'
import BurgerIngredients from '../burger-ingredients'
import BurgerConstructor from '../burgrer-constructor'
import { useDispatch } from 'react-redux'
import { getIngredients } from '../../services/actions'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <div className={`${AppStyles.App}`}>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <main className={AppStyles.main}>
          <section className={`${AppStyles.constructor}`}>
            <BurgerIngredients />
          </section>
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  )
}

export default App
