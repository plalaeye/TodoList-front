import { Icon } from '@iconify/react'
import Router from 'next/router'
import { logout } from '../api/AccountFunction'
import addTaskStoreInstance from '../contexts/AddTaskStore'
import userStoreInstance from '../contexts/UserStore'

const LogoutButton = () => {
  const onClick = async () => {
    await logout()
    Router.push('/login')
    userStoreInstance.clear()
    addTaskStoreInstance.clear()
  }

  return (
    <button
      className="w-full h-fit bg-light-3 dark:bg-dark-2 py-4 px-5 rounded-lg text-light-1 dark:text-dark-4 text-size-xl shadow-md hover:bg-light-4 hover:dark:bg-dark-3 hover:dark:text-dark-1"
      onClick={onClick}
    >
      <div className="flex justify-center items-center space-x-1.5">
        <Icon icon="majesticons:logout-line" hFlip={true} className="" />
        <h3>Logout</h3>
      </div>
    </button>
  )
}

export default LogoutButton
