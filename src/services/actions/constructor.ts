import { TIngredients } from '../../utils/types'
export const RESET_CONSTRUCTOR: 'RESET_CONSTRUCTOR' = 'RESET_CONSTRUCTOR'
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN'
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT'
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT'
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT'

export interface IResetConstructor {
  readonly type: typeof RESET_CONSTRUCTOR
}

export interface IAddBun {
  readonly type: typeof ADD_BUN
  readonly bunId: string
}

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT
  readonly payload: TIngredients
  readonly uuid: string
}

export interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT
  readonly hoverIndex: number
  readonly dragIndex: number
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT
  readonly payload: number
}

export type TConstructor =
  | IResetConstructor
  | IAddBun
  | IAddIngredient
  | IMoveIngredient
  | IDeleteIngredient
