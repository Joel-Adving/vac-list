'use client'

import AuthContextProvider from '@/context/AuthContext'
import React from 'react'
import { RecoilRoot } from 'recoil'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </AuthContextProvider>
  )
}
