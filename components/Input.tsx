export interface IInputProps {
  type: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ type, placeholder, onChange }: IInputProps) => {
  return (
    <input
      className="border-light-4 border-2 text-size-xl rounded-lg w-full px-2.5"
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
    />
  )
}

export default Input
