import PropTypes from 'prop-types'
import { ingredientPropTypes } from '../../utils/propTypes'
import React from 'react'
import mainStyles from './main.module.css'
import BurgerIngredients from '../burger-ingredients'
import BurgerConstructor from '../burgrer-constructor'

function Main(props) {
  return (
    <main className={mainStyles.main}>
      <section className={`${mainStyles.constructor}`}>
        <BurgerIngredients ingredients={props.ingredients} />
      </section>
      <section className={`pt-25`}>
        <BurgerConstructor ingredients={props.ingredients} />
      </section>
    </main>
  )
}

Main.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
}

export default Main
