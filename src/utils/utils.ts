import { ChangeEvent, useState } from 'react'

type TIngredientTypes = {
  BUN: string
  SAUCE: string
  MAIN: string
}

export const INGREDIENT_TYPES: TIngredientTypes = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main',
}

export function useForm<T>(inputValues: T) {
  const [values, setValues] = useState(inputValues)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setValues({ ...values, [name]: value })
  }
  return { values, handleChange, setValues }
}
