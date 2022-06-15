import { TaskStatus } from '../enum/taskStatus'

export default interface ITask {
  _id: string
  title: string
  detail?: string
  dueDate?: Date
  category?: string
  tags?: string[]
  status: TaskStatus
}
