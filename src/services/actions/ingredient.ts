export const SHOW_INGREDIENT_DETAILS: 'SHOW_INGREDIENT_DETAILS' =
  'SHOW_INGREDIENT_DETAILS'
export const HIDE_INGREDIENT_DETAILS: 'HIDE_INGREDIENT_DETAILS' =
  'HIDE_INGREDIENT_DETAILS'

export interface IShowIngredientDetails {
  readonly type: typeof SHOW_INGREDIENT_DETAILS
  readonly ingredientID: string
}

export interface IHideIngredientDetails {
  readonly type: typeof HIDE_INGREDIENT_DETAILS
}

export type TIngredient = IShowIngredientDetails | IHideIngredientDetails
