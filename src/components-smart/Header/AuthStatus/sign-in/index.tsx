'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

import { AuthModal } from './AuthModal'

export const SignInButton = () => {
  const session = useSession()
  const [authOpen, setAuthOpen] = useState(false)

  if (session?.data) return null

  return (
    <div>
      <button className="h-8" onClick={() => setAuthOpen(true)}>
        Sign In
      </button>

      <AuthModal open={authOpen} setAuthOpen={(val) => setAuthOpen(val)} />
    </div>
  )
}
