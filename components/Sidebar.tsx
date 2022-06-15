import { observer } from 'mobx-react'
import popupStoreInstance from '../contexts/PopupStore'
import userStoreInstance from '../contexts/UserStore'
import LogoutButton from './LogoutButton'
import TaskCategoryList from './TaskCategoryList'

const Sidebar = observer(() => {
  const categories = userStoreInstance.category

  const onClick = () => {
    popupStoreInstance.openAddCategory()
  }

  return (
    <aside className="hidden md:flex sticky flex-col h-screen w-1/3 max-w-xs bg-light-3 dark:bg-dark-2 space-y-2">
      <div className="grow-0 text-4xl font-bold text-light-1 dark:text-dark-4 p-7">
        <h1>Hello, {userStoreInstance.name}.</h1>
      </div>
      <div className="grow-0  text-2xl text-light-1 dark:text-dark-4 overflow-auto scrollbar">
        <TaskCategoryList />
      </div>
      <div className="grow p-3 flex flex-col justify-end">
        <LogoutButton />
      </div>
    </aside>
  )
})

export default Sidebar
