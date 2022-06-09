import Login from '../components/Login'
import ThemeToggle from '../components/ThemeToggle'
import userStoreInstance from '../contexts/UserStore'

const index = () => {
  return (
    <>
      <ThemeToggle userStore={userStoreInstance} />
      <Login />
    </>
  )
}

export default index
