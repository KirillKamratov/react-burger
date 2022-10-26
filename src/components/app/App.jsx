import React from 'react'
import AppStyles from './App.module.css'
import Header from '../header'
import Main from '../main'
import { INGREDIENTS_URL, isOk } from '../../utils/api'
import { IngredientContext } from '../../services/ingredientContext'

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
        <Main />
      </IngredientContext.Provider>
    </div>
  )
}

export default App
