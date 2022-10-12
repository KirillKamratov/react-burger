import React from 'react'
import AppStyles from './App.module.css'
import Header from '../header'
import Main from '../main'
import { INGREDIENTS_URL } from '../../utils/utils'

function App() {
  const [serverIngredients, setServerIngredients] = React.useState([])

  React.useEffect(() => {
    const isOk = res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    const getBurgerIngredients = () => {
      fetch(INGREDIENTS_URL)
        .then(isOk)
        .then(ingredients => {
          setServerIngredients(ingredients.data)
        })
    }
    getBurgerIngredients()
  }, [])

  return (
    <div className={`${AppStyles.App}`}>
      <Header />
      <Main ingredients={serverIngredients} />
    </div>
  )
}

export default App