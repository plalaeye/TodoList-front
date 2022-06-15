import classNames from 'classnames'
import ITask from '../interfaces/Task'
import Button from './Button'
import CloseButton from './CloseButton'
import DueDate from './DueDate'

export interface ITaskDetailProps {
  task: ITask
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}

const TaskDetailSide = ({
  task,
  onClose,
  onEdit,
  onDelete,
}: ITaskDetailProps) => {
  return (
    <div
      className={classNames(
        'hidden md:flex grow flex-col pt-12 pb-12 px-12 space-y-2.5 bg-light-2 dark:bg-dark-2 text-light-4 dark:text-dark-4',
        {
          hidden: !task,
        }
      )}
    >
      <div className="pb-10">
        <CloseButton onClick={onClose} />
      </div>
      <div className="grow flex flex-col p-6 space-y-6">
        <h3 className="text-2xl font-semibold">{task.title}</h3>
        <div className="px-2 justify-center">
          <DueDate
            dueDate={task.dueDate}
            showDate={true}
            taskStatus={task.status}
          />
        </div>
        <div className="grow flex flex-col">
          <h2 className="font-semibold">Detail</h2>
          <h3 className={classNames('p-3 grow', { italic: !task.detail })}>
            {task.detail ? task.detail : 'No detail provided'}
          </h3>
        </div>
      </div>
      <div className="flex flex-row space-x-2.5 justify-end items-end">
        <Button onClick={onEdit} text="Edit" icon="eva:edit-fill" />
        <Button
          onClick={onDelete}
          text="Delete"
          icon="fluent:delete-12-filled"
          className="bg-light-red dark:bg-dark-red"
        />
      </div>
    </div>
  )
}

export default TaskDetailSide
