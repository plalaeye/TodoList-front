import { Icon } from '@iconify/react'

export interface IButtonProps {
  onClick: () => void
  text: string
  icon: string
}

const Button = ({ onClick, text, icon }: IButtonProps) => {
  return (
    <button
      className="m-auto bg-light-4 dark:bg-dark-3 py-4 px-5 rounded-lg text-light-1 dark:text-dark-1 text-size-xl"
      onClick={onClick}
    >
      <div className="flex">
        <h3>{text}</h3>
        <Icon icon={icon} className="text-2xl" />
      </div>
    </button>
  )
}

export default Button
