import axios from 'axios'
import userStoreInstance from '../contexts/UserStore'
import { IUser } from '../interfaces/User'

export const authCheck = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
    { withCredentials: true }
  )
  const data: IUser | null = res.data.user
  if (!data) {
    return false
  } else {
    userStoreInstance.setUser(data)
    return true
  }
}
