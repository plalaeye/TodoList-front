export interface IInputProps {
  type: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ type, placeholder, onChange }: IInputProps) => {
  return (
    <input
      className="border-light-4 dark:border-dark-4 bg-light-2 dark:bg-dark-2 border-2 text-light-4 dark:text-dark-4 text-size-xl rounded-lg w-full px-2.5 py-1"
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
    />
  )
}

export default Input
