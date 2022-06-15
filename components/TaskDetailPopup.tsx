import classNames from 'classnames'
import addTaskPopupStoreInstance from '../contexts/AddTaskPopupStore'
import popupStoreInstance from '../contexts/PopupStore'
import userStoreInstance from '../contexts/UserStore'
import ITask from '../interfaces/Task'
import Button from './Button'
import CloseButton from './CloseButton'
import DueDate from './DueDate'
import { ITaskDetailProps } from './TaskDetailSide'

const TaskDetailPopup = ({ task, onClose }: ITaskDetailProps) => {
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
    <div
      className={classNames(
        { hidden: !task },
        'flex md:hidden absolute h-screen w-screen backdrop-blur-md justify-center items-center z-30'
      )}
    >
      <div className="flex flex-col w-4/5 h-fit rounded-xl shadow-lg bg-light-2 dark:bg-dark-2 p-8 space-y-10">
        <CloseButton onClick={onClose} />
        <div className="space-y-5 text-light-4 dark:text-dark-4">
          <h3 className="text-2xl font-semibold">{task.title}</h3>
          <div className="px-2 space-y-5 justify-center">
            <DueDate dueDate={task.dueDate} taskStatus={task.status} />
            <div className="grow flex flex-col">
              <h2 className="font-semibold">Detail</h2>
              <h3 className={classNames('p-3 grow', { italic: !task.detail })}>
                {task.detail ? task.detail : 'No detail provided'}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-2.5 justify-end items-end">
          <Button
            onClick={() => {
              onEdit()
              onClose()
            }}
            text="Edit"
            icon="eva:edit-fill"
          />
          <Button
            onClick={onDelete}
            text="Delete"
            icon="fluent:delete-12-filled"
            className="bg-light-red dark:bg-dark-red"
          />
        </div>
      </div>
    </div>
  )
}

export default TaskDetailPopup
