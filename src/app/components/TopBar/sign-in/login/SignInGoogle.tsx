'use client'

import { signIn } from 'next-auth/react'

export default function SignInPage() {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          {/* Divider */}
          <div className="relative mt-10">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-white px-6 text-gray-900">Or continue with</span>
            </div>
          </div>

          {/* Google Sign-In Button */}
          <div className="mt-6 grid gap-4">
            <button
              onClick={() => signIn('google')}
              className="flex w-full justify-center items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path d="M19.6 10.23c0-.7-.06-1.22-.18-1.75H10v3.18h5.56c-.1.84-.65 2.1-1.87 2.95l-.02.13 2.72 2.1.19.02c1.74-1.6 2.73-3.96 2.73-6.63z" />
                <path d="M10 20c2.46 0 4.53-.82 6.04-2.22l-2.88-2.23c-.78.54-1.82.91-3.16.91-2.42 0-4.47-1.64-5.2-3.85l-.1.01-2.82 2.18-.04.1A9.98 9.98 0 0 0 10 20z" />
                <path d="M4.8 11.61A5.97 5.97 0 0 1 4.42 10c0-.56.1-1.1.26-1.61L1.83 6.21l-.09.04A9.97 9.97 0 0 0 0 10c0 1.64.39 3.18 1.07 4.54l3.73-2.93z" />
                <path d="M10 4.02c1.7 0 2.84.73 3.49 1.34l2.55-2.49C14.5 1.13 12.46 0 10 0 6.14 0 2.94 2.33 1.83 5.71l3.72 2.9C6.02 6.61 7.9 4.02 10 4.02z" />
              </svg>
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
