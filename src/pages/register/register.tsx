import React, { FormEvent } from 'react'
import basicPagesStyles from '../basicPagesStyles.module.css'
import {
  Input,
  PasswordInput,
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { registration } from '../../services/actions/auth'
import { useCustomDispatch, useCustomSelector } from '../../services/store'
import { useForm } from '../../utils/utils'
import { TLocation } from '../../utils/types'

const Register = () => {
  const dispatch = useCustomDispatch()
  const history = useHistory()
  const location = useLocation<TLocation>()
  const { user } = useCustomSelector(state => state.auth)
  const isAuth = user !== null

  const { values, handleChange } = useForm({
    email: '',
    password: '',
    name: '',
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(registration(values)).then(() => {
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
            placeholder={'E-mail'}
            onChange={handleChange}
            value={values.email}
            name={'email'}
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
