import basicPagesStyles from '../basicPagesStyles.module.css'
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect } from 'react-router-dom'
import { useCustomDispatch, useCustomSelector } from '../../services/store'
import React, { FC, FormEvent } from 'react'
import { forgotPassword } from '../../services/actions/forgotPassword'
import { useForm } from '../../utils/utils'

const ForgotPassword: FC = () => {
  const dispatch = useCustomDispatch()
  const { user } = useCustomSelector(state => state.auth)
  const isAuth = user !== null

  const { values, handleChange } = useForm({
    email: '',
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(forgotPassword(values.email))
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
        <h1 className={'text text_type_main-large mb-6'}>
          Восстановление пароля
        </h1>
        <div className={'mb-6'}>
          <EmailInput
            placeholder={'E-mail'}
            onChange={handleChange}
            value={values.email}
            name={'email'}
            size={'default'}
          />
        </div>
        <Button
          type='primary'
          htmlType='button'
        >
          Восстановить
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mb-4'>
        Вспомнили пароль?
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

export default ForgotPassword
