import { Icon } from '@iconify/react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import userStoreInstance from '../contexts/UserStore'
import { TaskStatus } from '../enum/taskStatus'

export interface ICheckboxProps {
  taskId: string
  status: TaskStatus
}

const Checkbox = observer(({ taskId, status }: ICheckboxProps) => {
  const onClick = () => {
    if (status === TaskStatus.COMPLETED)
      userStoreInstance.updateStatus(taskId, TaskStatus.ONGOING)
    else userStoreInstance.updateStatus(taskId, TaskStatus.COMPLETED)
  }

  return (
    <div onClick={onClick} className='cursor-pointer'>
      {status === TaskStatus.ONGOING ? (
        <Icon
          icon="fluent:checkbox-unchecked-16-regular"
          className="text-2xl"
        />
      ) : (
        <Icon icon="fluent:checkbox-checked-16-filled" className="text-2xl" />
      )}
    </div>
  )
})

export default Checkbox
