import constructorIngredientStyles from './constructor-ingredient.module.css'
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import {
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from '../../services/actions/constructor'
import React, { FC, useRef } from 'react'
import { useCustomDispatch } from '../../services/store'
import { useDrag, useDrop } from 'react-dnd'
import { TIngredients } from '../../utils/types'

type TConstructorIngredient = {
  index: number
  ingredient: TIngredients
}

type TDragItem = {
  index: number
}

const ConstructorIngredient: FC<TConstructorIngredient> = ({
  index,
  ingredient,
}) => {
  const dispatch = useCustomDispatch()

  const ref = useRef<HTMLLIElement>(null)

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
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

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    hover(item: TDragItem, monitor) {
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
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top
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
            payload: index,
          })
        }}
      />
    </li>
  )
}

export default ConstructorIngredient
