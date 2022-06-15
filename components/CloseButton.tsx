import { Icon } from '@iconify/react'
import React from 'react'

interface ICloseButtonProps {
  onClick: () => void
}

const CloseButton = ({ onClick }: ICloseButtonProps) => {
  return (
    <Icon
      icon="emojione-v1:cross-mark"
      className="text-xl text-light-red dark:text-dark-red cursor-pointer"
      onClick={onClick}
    />
  )
}

export default CloseButton
