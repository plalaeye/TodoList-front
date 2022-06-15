import axios from 'axios'
import userStoreInstance, { IUser } from '../contexts/UserStore'
import { Theme } from '../enum/theme'

export const themeChange = async (theme: Theme): Promise<IUser | undefined> => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/theme`,
      { theme: userStoreInstance.theme },
      { withCredentials: true }
    )
    const data: IUser = res.data
    return data
  } catch (e) {
    return undefined
  }
}
