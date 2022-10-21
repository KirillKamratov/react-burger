import React from 'react'
import mainStyles from './main.module.css'
import BurgerIngredients from '../burger-ingredients'
import BurgerConstructor from '../burgrer-constructor'

function Main() {
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

export default Main
