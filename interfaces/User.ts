import { Theme } from '../enum/theme'
import ITask from './Task'

export interface IUser {
  _id: string
  name: string
  category: string[]
  tasks: ITask[]
  theme: Theme
}
