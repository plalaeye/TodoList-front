import { Icon } from '@iconify/react'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import userStoreInstance from '../contexts/UserStore'
import LogoutButton from './LogoutButton'
import TaskCategoryList from './TaskCategoryList'

const Navbar = observer(() => {
  const [isShow, setIsShow] = React.useState(false)

  const [hidden, setHidden] = React.useState(true)
  const [invisible, setInvisible] = React.useState(true)

  useEffect(() => {
    if (isShow) {
      setHidden(false)
      setTimeout(() => {
        setInvisible(false)
      }, 100)
    } else {
      setInvisible(true)
      setTimeout(() => {
        setHidden(true)
      }, 300)
    }
  }, [isShow])

  const onClick = () => {
    setIsShow(!isShow)
  }

  return (
    <nav className="flex flex-col w-full absolute md:hidden text-light-1 dark:text-dark-4">
      <div className="flex flex-row space-x-4 p-5 items-center bg-light-3 dark:bg-dark-2 z-10">
        <Icon
          icon="icon-park-outline:hamburger-button"
          className="text-lg"
          onClick={onClick}
        />
        <h3 className="text-2xl">{userStoreInstance.selectedCategory}</h3>
      </div>
      <div
        className={classNames(
          'bg-light-3 dark:bg-dark-2 pb-5 transition-all ease-in-out duration-300 origin-top',
          {
            'invisible scale-y-0': invisible,
          },
          {
            hidden: hidden,
          }
        )}
      >
        <TaskCategoryList />
        <LogoutButton />
      </div>
    </nav>
  )
})

export default Navbar
