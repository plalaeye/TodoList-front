import { Icon } from '@iconify/react'
import classNames from 'classnames'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { ChangeEvent, useState } from 'react'
import addTaskPopupStoreInstance from '../contexts/AddTaskPopupStore'
import popupStoreInstance from '../contexts/PopupStore'
import userStoreInstance from '../contexts/UserStore'
import { TaskStatus } from '../enum/taskStatus'
import ITask from '../interfaces/Task'
import AddButton from './AddButton'
import Task from './Task'

enum SortType {
  DUEDATE = 'duedate',
  CREATED_OLD = 'created_old',
  CREATED_NEW = 'created_new',
}

const Tasks = observer(() => {
  const tasks = toJS(userStoreInstance.tasks)
  const filteredTasks = tasks.filter((task) => {
    if (userStoreInstance.selectedCategory === 'All Tasks')
      return task.status !== TaskStatus.COMPLETED
    if (userStoreInstance.selectedCategory === 'Completed')
      return task.status === TaskStatus.COMPLETED
    return (
      task.category === userStoreInstance.selectedCategory &&
      task.status !== TaskStatus.COMPLETED
    )
  })

  const [sortType, setSortType] = useState<SortType>(SortType.CREATED_OLD)

  const sortTasks = (sortType: SortType) => {
    if (sortType === SortType.DUEDATE) {
      return filteredTasks.sort((a, b) => {
        if (a.dueDate && b.dueDate) {
          const aDate = new Date(a.dueDate)
          const bDate = new Date(b.dueDate)
          return aDate.getTime() - bDate.getTime()
        } else if (a.dueDate) {
          return -1
        } else if (b.dueDate) {
          return 1
        } else {
          return 0
        }
      })
    } else if (sortType === SortType.CREATED_OLD) {
      return filteredTasks
    } else {
      return filteredTasks.reverse()
    }
  }

  const [sortedTasks, setSortedTasks] = useState<ITask[]>(sortTasks(sortType))

  const onClick = () => {
    addTaskPopupStoreInstance.setAdd()
    popupStoreInstance.openAddTask()
  }

  const onSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as SortType)
    setSortedTasks(sortTasks(sortType))
  }

  return (
    <div className="w-full md:w-2/5 flex flex-col pt-16 md:pt-5 pb-5 px-5 md:pr-0 text-light-4 dark:text-dark-4">
      <div className="py-8 px-8 text-4xl hidden md:inline">
        <h1>{userStoreInstance.selectedCategory}</h1>
      </div>
      <div className="items-stretch pt-5 md:pt-0">
        <div className="flex w-full px-5 py-5 text-sm space-x-1 align-middle">
          <Icon icon="fluent:arrow-sort-16-filled" className="w-5 h-5" />
          <select onChange={onSort}>
            <option value={SortType.CREATED_OLD}>
              Date Created(Oldest-Newest)
            </option>
            <option value={SortType.CREATED_NEW}>
              Date Created(Newest-Oldest
            </option>
            <option value={SortType.DUEDATE}>DueDate</option>
          </select>
        </div>
        <div className="flex flex-col h-[66vh] overflow-y-auto overflow-x-hidden scrollbar">
          {filteredTasks.map((task: ITask) => (
            <div key={task._id}>
              <Task task={task} />
              <div className="h-px bg-light-4 dark:bg-dark-4"></div>
            </div>
          ))}
        </div>
        <AddButton
          onClick={onClick}
          className={classNames('text-light-4 dark:text-dark-4', {
            hidden: userStoreInstance.selectedCategory === 'Completed',
          })}
        />
      </div>
    </div>
  )
})

export default Tasks
