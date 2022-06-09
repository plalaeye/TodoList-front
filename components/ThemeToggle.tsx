import { Icon } from '@iconify/react'
import { observer } from 'mobx-react'
import { userStore } from '../contexts/UserStore'
import { Theme } from '../enum/theme'

interface IThemeProps {
  userStore: userStore
}

const ThemeToggle = observer(({ userStore }: IThemeProps) => {
  const theme = userStore.theme

  const onClick = () => {
    let newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    userStore.setTheme(newTheme)
  }

  return (
    <div className="absolute top-3.5 right-3.5" onClick={onClick}>
      {theme === Theme.LIGHT ? (
        <Icon icon="heroicons-solid:sun" className="text-2xl text-light-4" />
      ) : (
        <Icon
          icon="fluent:weather-moon-16-filled"
          className="text-2xl text-dark-4"
        />
      )}
    </div>
  )
})

export default ThemeToggle
