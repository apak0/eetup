'use client'

import { useSession } from 'next-auth/react'

import { SignInButton } from './sign-in'
import { UserDropdown } from './user-dropdown'

export const AuthStatus = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') return null

  return session?.user ? <UserDropdown /> : <SignInButton />
}
