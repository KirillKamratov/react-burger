import AccountMenu from '../../components/account-menu'
import UserInfo from '../../components/user-info'
import profileStyles from './profile.module.css'

const Profile = () => {
  return (
    <main className={profileStyles.main}>
      <AccountMenu />
      <UserInfo />
    </main>
  )
}

export default Profile
