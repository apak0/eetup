'use client'

import { signOut, useSession } from 'next-auth/react'

export const SignOutButton = () => {
  const session = useSession()

  if (!session?.data) return null
  return (
    <button
      className="h-8"
      onClick={() => {
        signOut({ callbackUrl: '/' })
      }}
    >
      Sign out
    </button>
  )
}
