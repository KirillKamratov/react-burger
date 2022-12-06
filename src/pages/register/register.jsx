import React from 'react'
import basicPagesStyles from '../basicPagesStyles.module.css'
import {
  Input,
  PasswordInput,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { registration } from '../../services/actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../utils/utils'
import { isOk } from '../../utils/api'

const Register = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const { user } = useSelector(state => state.auth)
  const isAuth = user !== null

  const { values, handleChange } = useForm({
    email: '',
    password: '',
    name: '',
  })

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(registration(values))
      .then(isOk)
      .then(() => {
        history.push(location.state?.from || '/')
      })
  }

  if (isAuth) {
    return <Redirect to={'/'} />
  }

  return (
    <div className={basicPagesStyles.main}>
      <form
        className={`${basicPagesStyles.form} mb-20`}
        onSubmit={handleSubmit}
      >
        <h1 className={'text text_type_main-large mb-6'}>Регистрация</h1>
        <div className={'mb-6'}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChange}
            value={values.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={'mb-6'}>
          <EmailInput
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChange}
            value={values.email}
            name={'email'}
            error={false}
            size={'default'}
          />
        </div>

        <div className={'mb-6'}>
          <PasswordInput
            value={values.password}
            name={'password'}
            onChange={handleChange}
          />
        </div>

        <Button
          htmlType='submit'
          type='primary'
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive'>
        Уже зарегистрированы?
        <Link
          to='/login'
          className={`${basicPagesStyles.link} ml-2`}
        >
          Войти
        </Link>
      </p>
    </div>
  )
}

export default Register
