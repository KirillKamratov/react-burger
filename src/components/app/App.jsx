import React from 'react'
import AppStyles from './App.module.css'
import Header from '../header'
import { INGREDIENTS_URL, isOk } from '../../utils/api'
import { IngredientContext } from '../../services/ingredientContext'
import BurgerIngredients from '../burger-ingredients'
import BurgerConstructor from '../burgrer-constructor'

function App() {
  const [serverIngredients, setServerIngredients] = React.useState([])

  React.useEffect(() => {
    fetch(INGREDIENTS_URL)
      .then(isOk)
      .then(ingredients => {
        setServerIngredients(ingredients.data)
      })
      .catch(error => {
        console.log(error.message)
      })
  }, [])
  return (
    <div className={`${AppStyles.App}`}>
      <Header />
      <IngredientContext.Provider value={serverIngredients}>
        <main className={AppStyles.main}>
          <section className={`${AppStyles.constructor}`}>
            <BurgerIngredients />
          </section>
          <section className={`pt-25`}>
            <BurgerConstructor />
          </section>
        </main>
      </IngredientContext.Provider>
    </div>
  )
}

export default App
