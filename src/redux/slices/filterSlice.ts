import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'

type FilterType = 'all' | 'banned' | 'suspects' | 'vac banned' | 'game banned'

export interface FilterState {
  value: FilterType
}

const initialState: FilterState = {
  value: 'all'
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.value = action.payload
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer

export const useFilterState = () => {
  const value = useSelector((state: RootState) => state.filter.value)
  const dispatch = useDispatch()
  return [value, (value: FilterType) => dispatch(setFilter(value))] as const
}
