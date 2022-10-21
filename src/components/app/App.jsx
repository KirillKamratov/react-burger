import React from 'react'
import AppStyles from './App.module.css'
import Header from '../header'
import Main from '../main'
import { getBurgerIngredients } from '../../utils/api'
import { IngredientContext } from '../../providers/ingredientContext'

function App() {
  const [serverIngredients, setServerIngredients] = React.useState([])

  React.useEffect(() => {
    getBurgerIngredients(setServerIngredients)
  }, [])
  return (
    <div className={`${AppStyles.App}`}>
      <Header />
      <IngredientContext.Provider value={serverIngredients}>
        <Main />
      </IngredientContext.Provider>
    </div>
  )
}

export default App
