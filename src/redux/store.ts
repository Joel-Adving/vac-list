import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import searchReducer from './slices/searchSlice'
import profilesReducer from './slices/profilesSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    search: searchReducer,
    profiles: profilesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
