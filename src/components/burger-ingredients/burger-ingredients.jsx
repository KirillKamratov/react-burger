import React from 'react'
import burgerIngredientsStyles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsGrid from '../ingredients-grid'

class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'Булки',
    }
  }

  handleValueSwitch = value => {
    this.setState({
      value: value,
    })
  }

  render() {
    return (
      <>
        <h1
          className={`mt-10 mb-5 text text_color_primary text_type_main-large`}
        >
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
                  active={this.state.value === 'Булки'}
                  onClick={this.handleValueSwitch}
                  value={'Булки'}
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
                  active={this.state.value === 'Соусы'}
                  onClick={this.handleValueSwitch}
                  value={'Соусы'}
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
                  active={this.state.value === 'Начинки'}
                  onClick={this.handleValueSwitch}
                  value={'Начинки'}
                >
                  Начинки
                </Tab>
              </a>
            </li>
          </ul>
        </nav>
        <ul className={`${burgerIngredientsStyles.list}`}>
          <li className={burgerIngredientsStyles.item}>
            <IngredientsGrid
              type='bun'
              text='Булки'
            />
          </li>
          <li className={burgerIngredientsStyles.item}>
            <IngredientsGrid
              type='sauce'
              text='Соусы'
            />
          </li>
          <li className={burgerIngredientsStyles.item}>
            <IngredientsGrid
              type='main'
              text='Начинки'
            />
          </li>
        </ul>
      </>
    )
  }
}

export default BurgerIngredients
