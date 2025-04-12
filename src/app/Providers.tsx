'use client'
import { SessionProvider } from 'next-auth/react'

export const Providers = ({ children }: { children: any }) => {
  return <SessionProvider>{children}</SessionProvider>
}
