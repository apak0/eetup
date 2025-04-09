'use client'
import { SessionProvider } from 'next-auth/react'

export const ProviderWrapper = ({ children }: { children: any }) => {
  return <SessionProvider>{children}</SessionProvider>
}
