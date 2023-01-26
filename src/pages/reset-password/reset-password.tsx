import basicPagesStyles from '../basicPagesStyles.module.css'
import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useCustomSelector, useCustomDispatch } from '../../services/store'
import { resetPassword } from '../../services/actions/resetPassword'
import { useForm } from '../../utils/utils'
import React, { FC, FormEvent } from 'react'

const ResetPassword: FC = () => {
  const dispatch = useCustomDispatch()
  const { user } = useCustomSelector(state => state.auth)
  const history = useHistory()

  const { values, handleChange } = useForm({
    password: '',
    passcode: '',
  })
  const isAuth = user !== null

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(resetPassword(values))
  }

  if (isAuth) {
    return <Redirect to={'/'} />
  }

  if (history.location?.state !== 'reset-password') {
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
          <PasswordInput
            placeholder={'Введите новый пароль'}
            value={values.password}
            name={'password'}
            onChange={handleChange}
          />
        </div>
        <div className={'mb-6'}>
          <Input
            placeholder={'Введите код из письма'}
            value={values.passcode}
            name={'passcode'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            onChange={handleChange}
          />
        </div>
        <Button
          htmlType='button'
          type='primary'
        >
          Сохранить
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive'>
        Вспомнили пароль?
        <Link
          to='/login'
          className={basicPagesStyles.link + ' ml-2'}
        >
          Войти
        </Link>
      </p>
    </div>
  )
}

export default ResetPassword
