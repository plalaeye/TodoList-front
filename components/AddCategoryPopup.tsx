import classNames from 'classnames'
import { observer } from 'mobx-react'
import React from 'react'
import { useState } from 'react'
import popupStoreInstance from '../contexts/PopupStore'
import userStoreInstance from '../contexts/UserStore'
import Button from './Button'
import CloseButton from './CloseButton'

const AddCategoryPopup = observer(() => {
  const [category, setCategory] = useState<string>('')

  const isShow = !popupStoreInstance.isAddCategory

  const formRef = React.createRef<HTMLFormElement>()

  const onClose = () => {
    setCategory('')
    popupStoreInstance.closeAddCategory()
    formRef.current?.reset()
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  const onSubmit = () => {
    if (!category || category === '') {
      alert('Please enter your category')
      return
    }

    if (category.length > 32) {
      alert('Category name cannot be longer than 32 characters')
      return
    }

    userStoreInstance.addCategory(category)
    popupStoreInstance.closeAddCategory()
    formRef.current?.reset()
  }

  return (
    <div
      className={classNames(
        { hidden: isShow },
        'flex absolute min-h-screen w-screen backdrop-blur-md justify-center items-center z-30'
      )}
    >
      <div className="flex flex-col w-4/5 md:w-1/3 h-fit rounded-xl shadow-lg bg-light-2 dark:bg-dark-2 p-8 space-y-5">
        <CloseButton onClick={onClose} />
        <form
          ref={formRef}
          className="flex flex-col justify-center items-center space-y-10"
          onSubmit={onSubmit}
        >
          <h3 className="text-light-4 dark:text-dark-4 text-xl">
            Add new Category
          </h3>
          <input type="text" placeholder="Category" onChange={onChange} />
          <div>
            <Button icon="fluent:add-16-filled" text="Add" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
})

export default AddCategoryPopup
