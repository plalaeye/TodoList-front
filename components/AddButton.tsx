import { Icon } from '@iconify/react'
import classNames from 'classnames'

interface IAddButtonProps {
  onClick: () => void
  className?: string
}

const AddButton = ({ onClick, className }: IAddButtonProps) => {
  return (
    <div className="flex justify-center items-center px-6 py-5">
      <Icon
        icon="akar-icons:circle-plus"
        className={`text-3xl text-light-1 dark:text-dark-4 cursor-pointer ${className}`}
        onClick={onClick}
      />
    </div>
  )
}

export default AddButton
