import { useState } from 'react'
import Button from './Button'
import Input from './Input'

const Login = () => {
  const [name, setName] = useState('')

  const onClick = () => {
    console.log('click')
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    console.log(name)
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-light-1 dark:bg-dark-1">
        <div className="flex-column w-fit h-fit justify-items-center text-center space-y-6 p-10 bg-light-2 dark:bg-dark-2 rounded-2xl shadow-lg">
          <h1 className="font-bold text-light-4 dark:text-dark-4 text-2xl">
            Please enter your name
          </h1>
          <Input type="text" placeholder="something" onChange={onChange} />
          <Button
            onClick={onClick}
            text="Continue"
            icon="majesticons:login-line"
          />
        </div>
      </div>
    </>
  )
}

export default Login
