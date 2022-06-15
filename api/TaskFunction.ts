import axios from 'axios'
import { TaskStatus } from '../enum/taskStatus'
import CreateTaskDto from '../interfaces/CreateTaskDto'
import ITask from '../interfaces/Task'
import { IUser } from '../interfaces/User'

export const updateStatus = async (
  id: string,
  status: TaskStatus
): Promise<IUser | undefined> => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/status/${id}`,
      { status },
      { withCredentials: true }
    )
    const data: IUser = res.data
    return data
  } catch (e) {
    return undefined
  }
}

export const deleteTask = async (id: string): Promise<IUser | undefined> => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`,
      { withCredentials: true }
    )
    const data: IUser = res.data
    return data
  } catch (e) {
    return undefined
  }
}

export const createTask = async (
  task: CreateTaskDto
): Promise<IUser | undefined> => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`,
      task,
      { withCredentials: true }
    )
    const data: IUser = res.data
    return data
  } catch (e) {
    return undefined
  }
}

export const updateTask = async (task: ITask): Promise<IUser | undefined> => {
  const { _id, ...taskWithoutId } = task

  console.log('updateTask')

  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${task._id}`,
      taskWithoutId,
      { withCredentials: true }
    )
    const data: IUser = res.data
    console.log('updateTask', data)
    return data
  } catch (e) {
    console.log(e)
    return undefined
  }
}
