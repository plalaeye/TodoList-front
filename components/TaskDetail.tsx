import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import addTaskStoreInstance from '../contexts/AddTaskStore'
import popupStoreInstance from '../contexts/PopupStore'
import userStoreInstance from '../contexts/UserStore'
import ITask from '../interfaces/Task'
import TaskDetailPopup from './TaskDetailPopup'
import TaskDetailSide from './TaskDetailSide'

const TaskDetail = observer(() => {
  const findTask: ITask | undefined = toJS(userStoreInstance).tasks.find(
    (task) => task._id === userStoreInstance.selectedTask
  )

  if (!findTask) return null

  const task: ITask = findTask

  const hasDetail: boolean =
    task.detail !== undefined && task.detail !== null && task.detail !== ''

  return (
    <>
      <TaskDetailSide task={task} />
      <TaskDetailPopup task={task} />
    </>
  )
})

export default TaskDetail
