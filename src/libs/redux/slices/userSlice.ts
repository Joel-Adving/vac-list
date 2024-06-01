import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { UserType } from '@/types'

export type UserState = {
  user: UserType | null
}

const initialState: UserState = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
export const selectUser = (state: RootState) => state.user.user

// export const useUserState = () => {
//   const value = useSelector((state: RootState) => state.search.value)
//   const dispatch = useDispatch()
//   return [value, (value: string) => dispatch(setSearch(value))] as const
// }
