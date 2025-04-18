'use client'
import { ImageKitProvider } from '@imagekit/next'
import { SessionProvider } from 'next-auth/react'

export const Providers = ({ children }: { children: any }) => {
  return (
    <ImageKitProvider urlEndpoint="https://ik.imagekit.io/7hymjkd5q">
      <SessionProvider>{children}</SessionProvider>
    </ImageKitProvider>
  )
}
