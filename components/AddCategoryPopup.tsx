import classNames from 'classnames'
import { observer } from 'mobx-react'
import { useState } from 'react'
import popupStoreInstance from '../contexts/PopupStore'
import userStoreInstance from '../contexts/UserStore'
import Button from './Button'
import CloseButton from './CloseButton'

const AddCategoryPopup = observer(() => {
  const [category, setCategory] = useState<string>('')

  const isShow = !popupStoreInstance.isAddCategory

  const onClose = () => {
    setCategory('')
    popupStoreInstance.closeAddCategory()
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  const onClick = () => {
    if (!category || category === '') {
      alert('Please enter your category')
      return
    }
    userStoreInstance.addCategory(category)
    popupStoreInstance.closeAddCategory()
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
        <div className="flex flex-col justify-center items-center space-y-10">
          <h3 className="text-light-4 dark:text-dark-4 text-xl">
            Add new Category
          </h3>
          <input type="text" placeholder="Category" onChange={onChange} />
          <div>
            <Button icon="fluent:add-16-filled" text="Add" onClick={onClick} />
          </div>
        </div>
      </div>
    </div>
  )
})

export default AddCategoryPopup
