import React, { FC } from 'react'
import AccountMenu from '../../components/account-menu'
import UserInfo from '../../components/user-info'
import profileStyles from './profile.module.css'

const Profile: FC = () => {
  return (
    <main className={profileStyles.main}>
      <AccountMenu />
      <UserInfo />
    </main>
  )
}

export default Profile
