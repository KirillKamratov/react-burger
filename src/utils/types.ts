import * as H from 'history'

export type TIngredients = {
  _id: string
  name: string
  type: string
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
  uuid?: string
}

export type TUser = {
  name: string
  email: string
  password?: string
}

export type TOrders = {
  ingredients: Array<string>
  _id: string
  status: string
  number: number
  createdAt: string
  updatedAt: string
  name: string
}

export type TWebSocketActions = {
  wsInit: string
  wsClosing: string
  wsSendMessage: string
  onOpen: string
  onClose: string
  onError: string
  onMessage: string
}

export type TLocation = {
  from?: H.Location | undefined
  background?: H.Location | undefined
}
