import classNames from 'classnames'
import { observer } from 'mobx-react'
import addTaskStoreInstance from '../contexts/AddTaskStore'
import popupStoreInstance from '../contexts/PopupStore'
import userStoreInstance from '../contexts/UserStore'
import ITask from '../interfaces/Task'
import Checkbox from './Checkbox'
import DueDate from './DueDate'

export interface ITaskProps {
  task: ITask
}

const Task = observer(({ task }: ITaskProps) => {
  let delay = 100
  let prevent = false

  const onClick = () => {
    userStoreInstance.setTask(task._id)
  }

  const onDoubleClick = () => {
    userStoreInstance.setTask(task._id)
    addTaskStoreInstance.setEdit()
  }

  const handleClick = () => {
    setTimeout(function () {
      if (!prevent) {
        onClick()
      }
      prevent = false
    }, delay)
  }

  const handleDoubleClick = () => {
    prevent = true
    onDoubleClick()
  }

  const selected = task._id === userStoreInstance.selectedTask

  return (
    <div
      className={classNames('flex flex-row px-5 py-5 space-x-8', {
        'bg-light-2 dark:bg-dark-2': selected,
      })}
    >
      <Checkbox taskId={task._id} status={task.status} />
      <h3
        onDoubleClick={handleDoubleClick}
        onClick={handleClick}
        className="grow overflow-x-auto scrollbar cursor-pointer text-lg md:text-base"
      >
        {task.title}
      </h3>
      <DueDate dueDate={task.dueDate} taskStatus={task.status} />
    </div>
  )
})

export default Task
