import { action, flow, makeObservable, observable } from 'mobx'
import { addCategory } from '../api/CategoryFunction'
import {
  createTask,
  deleteTask,
  updateStatus,
  updateTask,
} from '../api/TaskFunction'
import { themeChange } from '../api/ThemeFunction'
import { TaskStatus } from '../enum/taskStatus'
import { Theme } from '../enum/theme'
import CreateTaskDto from '../interfaces/CreateTaskDto'
import ITask from '../interfaces/Task'
import { IUser } from '../interfaces/User'
import { setDarkTheme, setLightTheme } from '../util/setTheme'

export class userStore {
  _id: string = ''
  name: string = ''
  category: string[] = []
  tasks: ITask[] = []
  theme: Theme = Theme.LIGHT
  selectedCategory: string = 'All Tasks'
  selectedTask: string = ''

  constructor() {
    makeObservable(this, {
      _id: observable,
      name: observable,
      category: observable,
      tasks: observable,
      theme: observable,
      selectedCategory: observable,
      selectedTask: observable,
      setTheme: flow,
      addCategory: flow,
      createTask: flow,
      updateTask: flow,
      updateStatus: flow,
      deleteTask: flow,
      setCategory: action,
      setTask: action,
    })
  }

  setUser(user: IUser) {
    this._id = user._id
    this.name = user.name
    this.category = user.category
    this.tasks = user.tasks
    this.setTheme(user.theme)
  }

  *setTheme(theme: Theme) {
    this.theme = theme
    if (theme === Theme.DARK) setDarkTheme()
    else setLightTheme()
    yield themeChange(theme)
  }

  *addCategory(category: string) {
    this.category.push(category)
    yield addCategory(category)
  }

  setCategory(category: string) {
    this.selectedCategory = category
    let curTaskCat = this.tasks.find(
      (task) => task._id === this.selectedTask
    )?.category
    if (
      curTaskCat &&
      this.selectedCategory !== 'All Tasks' &&
      this.selectedCategory !== curTaskCat
    ) {
      this.selectedTask = ''
    }
  }

  setTask(taskId: string) {
    this.selectedTask = taskId
  }

  *createTask(task: CreateTaskDto) {
    const user: IUser = yield createTask(task)
    this.setUser(user)
  }

  *updateTask(task: ITask) {
    this.tasks = this.tasks.map((t) => (t._id === task._id ? task : t))
    yield updateTask(task)
  }

  *updateStatus(taskId: string, status: TaskStatus) {
    this.tasks = this.tasks.map((task) =>
      task._id === taskId ? { ...task, status } : task
    )
    yield updateStatus(taskId, status)
    if (taskId === this.selectedTask) this.setTask('')
  }

  *deleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task._id !== taskId)
    yield deleteTask(taskId)
    if (taskId === this.selectedTask) this.setTask('')
  }
}

const userStoreInstance = new userStore()

export default userStoreInstance
