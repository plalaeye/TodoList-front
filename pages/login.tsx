import Login from '../components/Login'
import ThemeToggle from '../components/ThemeToggle'
import userStoreInstance from '../contexts/UserStore'

const index = () => {
  return (
    <>
      <ThemeToggle />
      <Login />
    </>
  )
}

export default index
