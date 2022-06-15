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

  if (isOverdue) text = 'Overdue!'

  return (
    <div className="flex flex-row items-center space-x-2 text-light-red dark:text-dark-red min-w-fit">
      <Icon
        icon={classNames(
          { 'material-symbols:date-range-rounded': !isOverdue },
          { 'jam:triangle-danger-f': isOverdue }
        )}
        className="text-2xl"
      />
      <h5 className="text-sm font-semibold">{text}</h5>
    </div>
  )
})

export default DueDate
