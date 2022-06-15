import axios from 'axios'
import { Theme } from '../enum/theme'
import { IUser } from '../interfaces/User'

export const login = async (name: string): Promise<IUser | undefined> => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      { name },
      { withCredentials: true }
    )
    const data: IUser = res.data
    return data
  } catch (e) {
    return undefined
  }
}

export const register = async (
  name: string,
  theme: Theme
): Promise<IUser | undefined> => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      { name, theme },
      { withCredentials: true }
    )
    const data: IUser = res.data
    return data
  } catch (e) {
    return undefined
  }
}

export const logout = async (): Promise<void> => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
      {},
      { withCredentials: true }
    )
  } catch (e) {}
}
