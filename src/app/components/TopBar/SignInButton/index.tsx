'use client'

import { useState } from 'react'
import { AuthModal } from './AuthModal'

export const SignInButton = () => {
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <div>
      <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={() => setAuthOpen(true)}>
        Sign In
      </button>

      <AuthModal open={authOpen} onOpenChange={(val) => setAuthOpen(val)} />
    </div>
  )
}
