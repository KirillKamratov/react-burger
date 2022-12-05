import AccountMenu from '../../components/account-menu'
import UserInfo from '../../components/user-info'
import basicPagesStyles from '../basicPagesStyles.module.css'

const Profile = () => {
  return (
    <main className={basicPagesStyles.container}>
      <AccountMenu />
      <UserInfo />
    </main>
  )
}

export default Profile
