import { observer } from 'mobx-react'
import React from 'react'
import popupStoreInstance from '../contexts/PopupStore'
import userStoreInstance from '../contexts/UserStore'
import AddButton from './AddButton'
import TaskCategory from './TaskCategory'

const TaskCategoryList = observer(() => {

  const onClick = () => {
    popupStoreInstance.openAddCategory()
  }

  return (
    <ul>
      <TaskCategory key="All Tasks" category="All Tasks" />
      {userStoreInstance.category.map((category) => (
        <TaskCategory key={category} category={category} />
      ))}
      <TaskCategory key="Completed" category="Completed" />
      <AddButton onClick={onClick} />
    </ul>
  )
})

export default TaskCategoryList