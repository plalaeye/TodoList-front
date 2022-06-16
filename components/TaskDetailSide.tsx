import classNames from 'classnames'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import addTaskStoreInstance from '../contexts/AddTaskStore'
import userStoreInstance from '../contexts/UserStore'
import { TaskStatus } from '../enum/taskStatus'
import CreateTaskDto from '../interfaces/CreateTaskDto'
import ITask from '../interfaces/Task'
import Button from './Button'
import CloseButton from './CloseButton'
import DueDate from './DueDate'

export interface ITaskDetailProps {
  task: ITask
}

const TaskDetailSide = observer(({ task }: ITaskDetailProps) => {
  const [isEdit, setIsEdit] = React.useState(false)

  const formRef = React.createRef<HTMLFormElement>()
  const textAreaRef = React.createRef<HTMLTextAreaElement>()

  const dateString = task.dueDate
    ? new Date(task.dueDate as Date).toISOString().split('T')[0]
    : undefined

  const onEdit = () => {
    addTaskStoreInstance.setId(task._id)
    addTaskStoreInstance.setTitle(task.title)
    addTaskStoreInstance.setDueDate(dateString)
    addTaskStoreInstance.setDetail(task.detail)
    addTaskStoreInstance.setEdit()
    setIsEdit(true)
  }

  const onDelete = () => {
    const text = 'Are you sure you want to delete this task?'
    if (confirm(text)) {
      userStoreInstance.deleteTask(userStoreInstance.selectedTask)
    }
  }

  const onClose = () => {
    userStoreInstance.setTask('')
    setIsEdit(false)
    formRef.current?.reset()
    textAreaRef.current!.value = ''
    addTaskStoreInstance.clear()
  }

  const onCancel = () => {
    setIsEdit(false)
    addTaskStoreInstance.clear()
  }

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addTaskStoreInstance.setTitle(e.target.value)
  }

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addTaskStoreInstance.setDueDate(e.target.value)
  }

  const onDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    addTaskStoreInstance.setDetail(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsEdit(false)

    if (!addTaskStoreInstance.title || addTaskStoreInstance.title === '') {
      alert('Please enter your title')
      return
    }

    let category: string | undefined = userStoreInstance.selectedCategory
    if (category === 'All Tasks' || category === 'Completed') {
      category = undefined
    }

    let task: CreateTaskDto = {
      title: addTaskStoreInstance.title,
      detail: addTaskStoreInstance.detail,
      status: TaskStatus.ONGOING,
      category: category,
      tags: [],
    }

    if (addTaskStoreInstance.dueDate) {
      task = { ...task, dueDate: new Date(addTaskStoreInstance.dueDate) }
    }

    if (addTaskStoreInstance.isEdit) {
      const taskId: string = addTaskStoreInstance._id as string
      userStoreInstance.updateTask({ _id: taskId, ...task })
    } else {
      userStoreInstance.createTask(task)
    }

    formRef.current?.reset()
    textAreaRef.current!.value = ''
    addTaskStoreInstance.clear()
  }

  const [isFirstRender, setIsFirstRender] = React.useState(true)

  useEffect(() => {
    if (addTaskStoreInstance.isEdit && isFirstRender) {
      onEdit()
      setIsFirstRender(false)
    }
  }, [addTaskStoreInstance.isEdit])

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
      <form ref={formRef} onSubmit={onSubmit} className="flex flex-col grow">
        <div className="grow flex flex-col p-6 space-y-6">
          <input
            disabled={!isEdit}
            className="text-2xl font-semibold"
            value={isEdit ? addTaskStoreInstance.title : task.title}
            onChange={onTitleChange}
          />
          <div className="flex flex-row pl-2 justify-start space-x-3">
            <DueDate
              dueDate={task.dueDate}
              taskStatus={task.status}
              noText={true}
            />
            <input
              disabled={true}
              type="text"
              className={classNames({ hidden: isEdit })}
              value={dateString ? dateString : 'No Due Date'}
            />
            <input
              disabled={false}
              className={classNames({ hidden: !isEdit })}
              type="date"
              onChange={onDateChange}
              value={addTaskStoreInstance.dueDate}
            />
          </div>
          <div className="grow flex flex-col">
            <h2 className="font-semibold">Detail</h2>
            <textarea
              ref={textAreaRef}
              disabled={!isEdit}
              className="grow justify-start disabled:resize-none"
              placeholder={!task.detail ? 'No detail provided' : ''}
              value={isEdit ? addTaskStoreInstance.detail : task.detail}
              onChange={onDetailChange}
            />
          </div>
        </div>
        <div className="grow-0 flex flex-row justify-end items-end">
          <div className={classNames('space-x-2.5', { hidden: isEdit })}>
            <Button
              text="Edit"
              icon="eva:edit-fill"
              type="button"
              onClick={onEdit}
            />
            <Button
              onClick={onDelete}
              text="Delete"
              icon="fluent:delete-12-filled"
              className="bg-light-red dark:bg-dark-red"
            />
          </div>
          <div className={classNames('space-x-2.5', { hidden: !isEdit })}>
            <Button text="Save" icon="fluent:save-24-filled" type="submit" />
            <Button
              onClick={onCancel}
              text="Cancel"
              icon="eva:close-fill"
              className="bg-light-red dark:bg-dark-red"
            />
          </div>
        </div>
      </form>
    </div>
  )
})

export default TaskDetailSide
