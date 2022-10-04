import PropTypes from 'prop-types'
import React from 'react'
import ingredientsGridStyles from './ingredients-grid.module.css'
import data from '../../utils/data'
import Ingredient from '../ingredient'

class IngredientsGrid extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const buns = []
    const sauces = []
    const mains = []

    data.forEach(ingredient => {
      if (ingredient.type === 'bun') {
        buns.push(ingredient)
      } else if (ingredient.type === 'sauce') {
        sauces.push(ingredient)
      } else if (ingredient.type === 'main') {
        mains.push(ingredient)
      }
    })
    return (
      <div>
        <h2
          className={`'text text_type_main-medium text_color_primary'`}
          id={this.props.type}
        >
          {this.props.text}
        </h2>
        <div className={`mb-10 ${ingredientsGridStyles.grid}`}>
          {[...buns, ...sauces, ...mains]
            .filter(ingredient => {
              return ingredient.type === this.props.type
            })
            .map((ingredient, key) => {
              return (
                <Ingredient
                  card={ingredient}
                  key={ingredient._id}
                />
              )
            })}
        </div>
      </div>
    )
  }
}

IngredientsGrid.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default IngredientsGrid
