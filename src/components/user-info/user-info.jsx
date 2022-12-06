import userInfoStyles from './user-info.module.css'
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../utils/utils'
import { isOk, USER_URL } from '../../utils/api'
import { getAccessToken } from '../../utils/auth'
import { USER_UPDATED } from '../../services/actions/auth'

const UserInfo = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const initialValues = {
    email: user.email,
    name: user.name,
    password: '',
  }

  const { values, handleChange, setValues } = useForm(initialValues)

  const isValuesEdited =
    values.name !== initialValues.name ||
    values.password !== initialValues.password ||
    values.email !== initialValues.email

  const valuesIsNotEmpty = values.name !== '' && values.email !== ''

  React.useEffect(() => {
    if (user.name && user.email) {
      setValues({
        name: user.name,
        email: user.email,
        password: initialValues.password,
      })
    }
  }, [user.name, user.email])

  const abortChanges = () => {
    setValues({
      name: user.name,
      email: user.email,
      password: initialValues.password,
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    fetch(USER_URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAccessToken(),
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    })
      .then(isOk)
      .then(data => {
        dispatch({
          type: USER_UPDATED,
          payload: data.user,
        })
      })
  }

  return (
    <form
      className={userInfoStyles.form}
      onSubmit={handleSubmit}
    >
      <Input
        value={values.name}
        name={'name'}
        onChange={handleChange}
        size={'default'}
        placeholder={'Имя'}
        icon={'EditIcon'}
      />
      <EmailInput
        value={values.email}
        name={'email'}
        onChange={handleChange}
        isIcon={true}
        placeholder={'Логин'}
      />
      <PasswordInput
        value={values.password}
        name={'password'}
        onChange={handleChange}
        icon={'EditIcon'}
      />
      {isValuesEdited && valuesIsNotEmpty && (
        <div className={userInfoStyles.container}>
          <Button
            htmlType={'button'}
            type={'secondary'}
            onClick={abortChanges}
          >
            Отмена
          </Button>
          <Button
            htmlType={'submit'}
            type={'primary'}
          >
            Сохранить
          </Button>
        </div>
      )}
    </form>
  )
}

export default UserInfo
