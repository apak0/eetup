import { useState } from 'react'

import SignInPage from './login/SignInGoogle'
import Login from './login'
import Register from './register'

import Modal from '@/reusables/Modal'

export function AuthModal({ open, setAuthOpen }: { open: boolean; setAuthOpen: (val: boolean) => void }) {
  const [loginContent, setLoginContent] = useState('initial')

  return (
    <Modal
      title={loginContent === 'initial' ? 'Welcome!' : ''}
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
              <button className="w-full " aria-disabled={false} type="button" onClick={() => setLoginContent('login')}>
                Login
              </button>
              <button
                className="w-full btn-default"
                aria-disabled={false}
                type="button"
                onClick={() => setLoginContent('register')}
              >
                Register
              </button>
              <SignInPage />
            </div>
          )}
          {loginContent === 'login' && (
            <div>
              <Login setLoginContent={setLoginContent} setAuthOpen={setAuthOpen} />
            </div>
          )}
          {loginContent === 'register' && (
            <div>
              <Register setLoginContent={setLoginContent} setAuthOpen={setAuthOpen} />
            </div>
          )}
        </div>
      }
      setAuthOpen={(val) => {
        setAuthOpen(val)
        if (!val) {
          setLoginContent('initial')
        }
      }}
    />
  )
}
