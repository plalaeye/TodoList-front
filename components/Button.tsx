import classNames from 'classnames'

export interface IButtonProps {
  onClick: () => void
  children: React.ReactNode
}

const Button = ({ onClick, children }: IButtonProps) => {
  return (
    <button
      className='m-auto bg-light-4 py-4 px-5 rounded-lg text-light-1 text-size-xl'
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
