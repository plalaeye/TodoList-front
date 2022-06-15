import classNames from 'classnames'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import userStoreInstance from '../contexts/UserStore'

export interface ITaskCategoryProps {
  category: string
}

const TaskCategory = observer(({ category }: ITaskCategoryProps) => {
  const onClick = () => {
    userStoreInstance.setCategory(category)
  }

  return (
    <li
      className={`text-xl md:text-base px-6 py-3 md:py-5 cursor-pointer hover:shadow-lg ${
        category === userStoreInstance.selectedCategory
          ? 'bg-light-4 dark:bg-dark-3 dark:text-dark-1'
          : ''
      }`}
      onClick={onClick}
    >
      {category}
    </li>
  )
})

export default TaskCategory
