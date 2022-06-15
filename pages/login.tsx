import Head from 'next/head'
import Login from '../components/Login'
import ThemeToggle from '../components/ThemeToggle'
import userStoreInstance from '../contexts/UserStore'

const index = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <ThemeToggle />
      <Login />
    </>
  )
}

export default index
