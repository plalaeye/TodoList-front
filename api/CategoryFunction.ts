import axios from 'axios'
import { IUser } from '../interfaces/User'

export const addCategory = async (
  category: string
): Promise<IUser | undefined> => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`,
      { category },
      { withCredentials: true }
    )
    const data: IUser = res.data
    return data
  } catch (e) {
    return undefined
  }
}
