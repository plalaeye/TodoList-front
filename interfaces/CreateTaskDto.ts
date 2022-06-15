import { TaskStatus } from '../enum/taskStatus'

export default interface CreateTaskDto {
  title: string
  detail?: string
  dueDate?: Date
  category?: string
  tags?: string[]
  status: TaskStatus
}
