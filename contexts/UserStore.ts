import { action, makeObservable, observable } from 'mobx'
import { TaskStatus } from '../enum/taskStatus'
import { Theme } from '../enum/theme'
import { setDarkTheme, setLightTheme } from '../util/setTheme'

export interface task {
  _id?: string
  title: string
  detail: string
  dueDate?: Date
  category?: string
  tags?: string[]
  status?: TaskStatus
}

export class userStore {
  _id: string = ''
  name: string = ''
  tasks: task[] = []
  theme: Theme = Theme.LIGHT

  constructor() {
    makeObservable(this, {
      _id: observable,
      name: observable,
      tasks: observable,
      theme: observable,
      createUser: action,
      setTheme: action,
      createTask: action,
      updateTask: action,
      deleteTask: action,
    })
  }

  createUser({
    _id,
    name,
    tasks,
    theme,
  }: {
    _id: string
    name: string
    tasks: task[]
    theme: Theme
  }) {
    this._id = _id
    this.name = name
    this.tasks = tasks
    this.theme = theme
  }

  setTheme(theme: Theme) {
    this.theme = theme
    if (theme === Theme.DARK) setDarkTheme()
    else setLightTheme()
  }

  createTask(task: task) {
    this.tasks.push(task)
  }

  updateTask(task: task) {
    this.tasks = this.tasks.map((t) => (t._id === task._id ? task : t))
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task._id !== taskId)
  }
}

const userStoreInstance = new userStore()

export default userStoreInstance
