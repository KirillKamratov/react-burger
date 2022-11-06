import constructorIngredientStyles from './constructor-ingredient.module.css'
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { DELETE_INGREDIENT, MOVE_INGREDIENT } from '../../services/actions'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import { useRef } from 'react'

const ConstructorIngredient = ({ index, ingredient }) => {
  const dispatch = useDispatch()

  const ref = useRef(null)

  const moveIngredient = (dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_INGREDIENT,
      dragIndex,
      hoverIndex,
    })
  }

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: () => {
      return { ingredient, index }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1

  const [{ handlerId }, dropRef] = useDrop({
    accept: 'ingredient',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveIngredient(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })
  dragRef(dropRef(ref))

  return (
    <li
      className={`mb-4  ${constructorIngredientStyles.ingredient}`}
      ref={ref}
      style={{ opacity }}
    >
      <DragIcon type='primary' />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={() => {
          dispatch({
            type: DELETE_INGREDIENT,
            payload: ingredient._id,
          })
        }}
      />
    </li>
  )
}

export default ConstructorIngredient
