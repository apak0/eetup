'use client'

import { useState } from 'react'

import { AuthModal } from './AuthModal'

export const SignInButton = () => {
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <div>
      <button className="h-8" onClick={() => setAuthOpen(true)}>
        Sign In
      </button>

      <AuthModal open={authOpen} onOpenChange={(val) => setAuthOpen(val)} />
    </div>
  )
}
