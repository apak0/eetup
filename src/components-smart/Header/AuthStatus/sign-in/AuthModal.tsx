import { useState } from 'react'

import SignInPage from './login/SignInGoogle'
import Login from './login'
import Register from './register'

import Modal from '@/components/Modal'
import ForgotPassword from './forgot-password'
import ResetPassword from './reset-password'
import { useSearchParams } from 'next/navigation'

export function AuthModal({ open, setAuthOpen }: { open: boolean; setAuthOpen: (val: boolean) => void }) {
  const [loginContent, setLoginContent] = useState('initial')
  const [token, setToken] = useState('')
  const searchParams = useSearchParams()
  const searchToken = searchParams.get('token')

  if (typeof window !== 'undefined') {
    const url = window.location.pathname + window.location.search
    setTimeout(() => {
      if (searchToken) setToken(searchToken)
    }, 0)
    if (url.startsWith('/auth/reset-password') && loginContent !== 'reset-password') {
      window.history.replaceState({}, '', '/')
      setTimeout(() => {
        setAuthOpen(true)
        setLoginContent('reset-password')
      }, 0)
    }
  }

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
              <button className="w-full btn-default" aria-disabled={false} type="button" onClick={() => setLoginContent('register')}>
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
          {loginContent === 'forgot-password' && (
            <div>
              <ForgotPassword setLoginContent={setLoginContent} />
            </div>
          )}
          {loginContent === 'reset-password' && (
            <div>
              <ResetPassword setLoginContent={setLoginContent} token={token} />
            </div>
          )}
          {loginContent === 'register' && (
            <div>
              <Register setLoginContent={setLoginContent} setAuthOpen={setAuthOpen} />
            </div>
          )}
        </div>
      }
      setOpen={(val) => {
        setAuthOpen(val)
        if (!val) {
          setLoginContent('initial')
        }
      }}
    />
  )
}
