import React from 'react'
import mainStyles from './main.module.css'
import BurgerIngredients from '../burger-ingredients'
import BurgerConstructor from '../burgrer-constructor'

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main className={mainStyles.main}>
        <section className={`${mainStyles.constructor}`}>
          <BurgerIngredients />
        </section>
        <section className={`pt-25`}>
          <BurgerConstructor />
        </section>
      </main>
    )
  }
}

export default Main
