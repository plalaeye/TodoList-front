import { Icon } from '@iconify/react'

export interface IButtonProps {
  onClick?: () => void
  text: string
  icon: string
  className?: string
  type?: 'button' | 'submit'
}

const Button = ({
  onClick,
  text,
  icon,
  className,
  type = 'button',
}: IButtonProps) => {
  return (
    <button
      className={`bg-light-4 dark:bg-dark-3 py-4 px-5 rounded-lg text-light-1 dark:text-dark-1 text-size-xl hover:shadow-lg ${className}`}
      onClick={onClick}
      type={type}
    >
      <div className="flex space-x-1">
        <h3>{text}</h3>
        <Icon icon={icon} className="text-2xl" />
      </div>
    </button>
  )
}

export default Button
