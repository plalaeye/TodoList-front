import classNames from 'classnames'
import { observer } from 'mobx-react'
import userStoreInstance from '../contexts/UserStore'
import ITask from '../interfaces/Task'
import Checkbox from './Checkbox'
import DueDate from './DueDate'

export interface ITaskProps {
  task: ITask
}

const Task = observer(({ task }: ITaskProps) => {
  const onClick = () => {
    userStoreInstance.setTask(task._id)
  }

  const selected = task._id === userStoreInstance.selectedTask

  return (
    <div className="flex flex-row px-5 py-5 space-x-8">
      <Checkbox taskId={task._id} status={task.status} />
      <h3
        onClick={onClick}
        className={classNames(
          'grow overflow-x-auto scrollbar cursor-pointer text-lg md:text-base',
          {
            'font-bold': selected,
          }
        )}
      >
        {task.title}
      </h3>
      <DueDate dueDate={task.dueDate} taskStatus={task.status} />
    </div>
  )
})

export default Task
