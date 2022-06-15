import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import addTaskPopupStoreInstance from '../contexts/AddTaskPopupStore'
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

  const onClose = () => {
    userStoreInstance.setTask('')
  }

  const onEdit = () => {
    const date = new Date(task.dueDate as Date)
    const dateString = task.dueDate
      ? date.toISOString().split('T')[0]
      : undefined

    addTaskPopupStoreInstance.setId(task._id)
    addTaskPopupStoreInstance.setTitle(task.title)
    addTaskPopupStoreInstance.setDueDate(dateString)
    addTaskPopupStoreInstance.setDetail(task.detail)
    addTaskPopupStoreInstance.setEdit()
    popupStoreInstance.openAddTask()
  }
  const onDelete = () => {
    const text = 'Are you sure you want to delete this task?'
    if (confirm(text)) {
      userStoreInstance.deleteTask(userStoreInstance.selectedTask)
    }
  }

  return (
    <>
      <TaskDetailSide
        task={task}
        onClose={onClose}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <TaskDetailPopup
        task={task}
        onClose={onClose}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  )
})

export default TaskDetail
