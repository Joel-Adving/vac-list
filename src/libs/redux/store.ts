import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import searchReducer from './slices/searchSlice'
import profilesReducer from './slices/profilesSlice'
import userReducer from './slices/userSlice'
import { nextApi } from './query/nextApi'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    search: searchReducer,
    profiles: profilesReducer,
    user: userReducer,
    [nextApi.reducerPath]: nextApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(nextApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
