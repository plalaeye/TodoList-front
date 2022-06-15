import { Icon } from '@iconify/react'
import { observer } from 'mobx-react'
import userStoreInstance, { userStore } from '../contexts/UserStore'
import { Theme } from '../enum/theme'

const ThemeToggle = observer(() => {
  const theme = userStoreInstance.theme

  const onClick = () => {
    let newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    userStoreInstance.setTheme(newTheme)
    if (userStoreInstance._id) {
    }
  }

  return (
    <div className="absolute top-3.5 right-3.5 z-20" onClick={onClick}>
      {theme === Theme.LIGHT ? (
        <Icon
          icon="heroicons-solid:sun"
          className="text-4xl md:text-2xl text-light-4"
        />
      ) : (
        <Icon
          icon="fluent:weather-moon-16-filled"
          className="text-4xl md:text-2xl text-dark-4"
        />
      )}
    </div>
  )
})

export default ThemeToggle
