import { Icon } from '@iconify/react'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { TaskStatus } from '../enum/taskStatus'

interface IDueDateProps {
  dueDate: Date | undefined
  taskStatus: TaskStatus
  showDate?: boolean
}

const DueDate = observer(({ dueDate, taskStatus, showDate }: IDueDateProps) => {
  const date = dueDate ? new Date(dueDate) : undefined

  const isOverdue =
    date &&
    date < new Date() &&
    !showDate &&
    taskStatus !== TaskStatus.COMPLETED

  let text = dueDate ? `${date?.toISOString().split('T')[0]}` : 'No DueDate'

  return (
    <div
      className={classNames(
        'flex flex-row items-center space-x-2 min-w-fit',
        { 'text-light-red dark:text-dark-red': isOverdue },
        { 'text-light-4 dark:text-dark-4': isOverdue }
      )}
    >
      <div title={isOverdue ? 'Overdue' : 'DueDate'}>
        <Icon
          icon={classNames(
            { 'material-symbols:date-range-rounded': !isOverdue },
            { 'jam:triangle-danger-f': isOverdue }
          )}
          className="text-2xl"
        />
      </div>
      <h5 className="text-sm font-semibold">{text}</h5>
    </div>
  )
})

export default DueDate
