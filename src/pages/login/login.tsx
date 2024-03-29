import basicPagesStyles from '../basicPagesStyles.module.css'
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useCustomDispatch } from '../../services/store'
import React, { FormEvent } from 'react'
import { login } from '../../services/actions/auth'
import { useForm } from '../../utils/utils'
import { TLocation } from '../../utils/types'

export const Login = () => {
  const dispatch = useCustomDispatch()
  const history = useHistory()
  const location = useLocation<TLocation>()

  const { values, handleChange } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(login(values)).then(() => {
      history.push(location.state?.from || '/react-burger')
    })
  }

  return (
    <div className={basicPagesStyles.main}>
      <form
        className={`${basicPagesStyles.form} mb-20`}
        onSubmit={handleSubmit}
      >
        <h1 className={'text text_type_main-large mb-6'}>Вход</h1>

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
          type='primary'
          htmlType='submit'
        >
          Войти
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mb-4'>
        Вы - новый пользователь?
        <Link
          to='/register'
          className={`${basicPagesStyles.link} ml-2`}
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className='text text_type_main-default text_color_inactive mb-4'>
        Забыли пароль?&nbsp;
        <Link
          to='/forgot-password'
          className={`${basicPagesStyles.link}`}
        >
          Восстановить пароль
        </Link>
      </p>
    </div>
  )
}

export default Login
