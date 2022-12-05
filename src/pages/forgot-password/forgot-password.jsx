import basicPagesStyles from '../basicPagesStyles.module.css'
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { forgotPassword } from '../../services/actions/forgotPassword'
import { useForm } from '../../utils/utils'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const isAuth = user !== null

  const { values, handleChange } = useForm({
    email: '',
  })

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(forgotPassword(values))
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
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChange}
            value={values.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
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
