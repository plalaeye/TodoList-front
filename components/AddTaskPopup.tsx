import classNames from 'classnames'
import { observer } from 'mobx-react'
import React from 'react'
import { useState } from 'react'
import addTaskStoreInstance from '../contexts/AddTaskStore'
import popupStoreInstance from '../contexts/PopupStore'
import userStoreInstance from '../contexts/UserStore'
import { TaskStatus } from '../enum/taskStatus'
import CreateTaskDto from '../interfaces/CreateTaskDto'
import Button from './Button'
import CloseButton from './CloseButton'

const AddTaskPopup = observer(() => {
  const formRef = React.createRef<HTMLFormElement>()
  const textAreaRef = React.createRef<HTMLTextAreaElement>()

  const onClose = () => {
    popupStoreInstance.closeAddTask()
    formRef.current?.reset()
    textAreaRef.current!.value = ''
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

    popupStoreInstance.closeAddTask()
    formRef.current?.reset()
    textAreaRef.current!.value = ''
    addTaskStoreInstance.clear()
  }

  return (
    <div
      className={classNames(
        { hidden: !popupStoreInstance.isAddTask },
        'flex absolute min-h-screen w-screen backdrop-blur-md justify-center items-center z-30'
      )}
    >
      <form
        ref={formRef}
        className="flex flex-col w-4/5 md:w-2/3 h-fit rounded-xl shadow-lg bg-light-2 dark:bg-dark-2 p-8 space-y-5"
        onSubmit={onSubmit}
      >
        <CloseButton onClick={onClose} />
        <div className="flex flex-col justify-center items-center space-y-5 md:space-y-10">
          <h3 className="text-light-4 dark:text-dark-4 text-xl">
            {addTaskStoreInstance.isEdit ? 'Edit Task' : 'Add New Task'}
          </h3>
          <div className="w-full flex flex-row flex-wrap md:flex-nowrap md:space-x-9 justify-center items-center gap-y-5 md:gap-y-0">
            <div className="w-full">
              <h4 className="text-light-4 dark:text-dark-4">Title</h4>
              <input
                type="text"
                className="grow"
                placeholder="Title"
                onChange={onTitleChange}
                value={addTaskStoreInstance.title}
              />
            </div>
            <div className="w-full md:w-fit md:justify-center md:items-center">
              <h4 className="text-light-4 dark:text-dark-4">DueDate</h4>
              <input
                type="date"
                className="grow md:grow-0"
                onChange={onDateChange}
                value={addTaskStoreInstance.dueDate}
              />
            </div>
          </div>
          <div className="w-full">
            <h4 className="text-light-4 dark:text-dark-4">Detail</h4>
            <textarea
              ref={textAreaRef}
              className="w-full"
              placeholder="Task Detail"
              onChange={onDetailChange}
              value={addTaskStoreInstance.detail}
            />
          </div>
          <div className="pt-5 md:pt-0">
            <Button
              icon={
                addTaskStoreInstance.isEdit
                  ? 'fluent:save-24-filled'
                  : 'fluent:add-16-filled'
              }
              text={addTaskStoreInstance.isEdit ? 'Save' : 'Add'}
              className={classNames({
                'dark:bg-dark-green bg-light-green':
                  addTaskStoreInstance.isEdit,
              })}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  )
})

export default AddTaskPopup
