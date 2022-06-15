import { useState } from 'react'
import userStoreInstance, { userStore } from '../contexts/UserStore'
import Button from './Button'
import Router from 'next/router'
import { observer } from 'mobx-react'
import { login, register } from '../api/AccountFunction'
import { IUser } from '../interfaces/User'

const Login = observer(() => {
  const [name, setName] = useState<string>('')

  const onClick = async () => {
    if (!name || name === '') {
      alert('Please enter your name')
      return
    }

    const data = await login(name)
    if (data) {
      userStoreInstance.setUser(data)
      Router.replace('/')
    } else {
      let message =
        "This account doesn't exist.\nDo you wish to create a new account?"
      if (confirm(message)) {
        const data: IUser | undefined = await register(
          name,
          userStoreInstance.theme
        )
        if (data) {
          userStoreInstance.setUser(data)
          Router.replace('/')
        } else {
          alert('Username already exists')
        }
      }
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-light-1 dark:bg-dark-1">
        <div className="flex-column w-4/5 md:w-fit h-fit justify-items-center text-center space-y-6 p-10 bg-light-2 dark:bg-dark-2 rounded-2xl shadow-lg">
          <h1 className="font-bold text-light-4 dark:text-dark-4 text-2xl">
            Please enter your name
          </h1>
          <input type="text" placeholder="username" onChange={onChange} />
          <Button
            onClick={onClick}
            text="Continue"
            icon="majesticons:login-line"
          />
        </div>
      </div>
    </>
  )
})

export default Login
