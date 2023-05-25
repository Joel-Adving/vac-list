'use client'

import AuthContextProvider from '@/context/AuthContext'
import React from 'react'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <Provider store={store}>{children}</Provider>
    </AuthContextProvider>
  )
}
