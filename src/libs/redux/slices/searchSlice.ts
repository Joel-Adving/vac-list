import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'

export interface searchState {
  value: string
}

const initialState: searchState = {
  value: ''
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setSearch } = searchSlice.actions
export default searchSlice.reducer

export const useSearchState = () => {
  const value = useSelector((state: RootState) => state.search.value)
  const dispatch = useDispatch()
  return [value, (value: string) => dispatch(setSearch(value))] as const
}
