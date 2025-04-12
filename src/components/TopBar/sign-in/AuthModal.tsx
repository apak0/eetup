import { useState } from 'react'

import Login from './login'
import Register from './register'

import Modal from '@/reusables/Modal'

export function AuthModal({ open, onOpenChange }: { open: boolean; onOpenChange: (val: boolean) => void }) {
  const [loginContent, setLoginContent] = useState('initial')

  return (
    <Modal
      title="Welcome!"
      okClick={() => {
        console.log('submit')
      }}
      open={open}
      footer={false}
      className="max-w-md"
      content={
        <div className="w-full p-8">
          {loginContent === 'initial' && (
            <div className="flex flex-col gap-4">
              <div className="h-0.5 bg-gray-2 w-full" />
              <button className="w-full " aria-disabled={false} type="button" onClick={() => setLoginContent('login')}>
                Login
              </button>
              <button
                className="w-full"
                aria-disabled={false}
                type="button"
                onClick={() => setLoginContent('register')}
              >
                Register
              </button>
            </div>
          )}
          {loginContent === 'login' && (
            <div>
              <Login setLoginContent={setLoginContent} />
            </div>
          )}
          {loginContent === 'register' && (
            <div>
              <Register setLoginContent={setLoginContent} />
            </div>
          )}
        </div>
      }
      onOpenChange={onOpenChange}
    />
  )
}
