import { RootState } from '@/libs/redux/store'
import { useSelector } from 'react-redux'

export function useUser() {
  return useSelector((state: RootState) => state.user.user)
}
