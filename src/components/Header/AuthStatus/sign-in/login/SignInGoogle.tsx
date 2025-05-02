'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function SignInPage() {
  return (
    <div className=" ">
      {/* Divider */}
      <div className="relative mt-2">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm font-medium leading-6">
          <span className="bg-(--bg) px-6">Or continue with</span>
        </div>
      </div>

      {/* Google Sign-In Button */}
      <div className="mt-6 grid gap-4">
        <button
          onClick={() => signIn('google')}
          className="relative flex w-full items-center justify-between px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 rounded-md bg-white"
        >
          <div className="relative w-6 h-6">
            <Image src="/google-logo.png" alt="Google Logo" width={24} height={24} className="object-contain" priority />
          </div>
          <span className="text-lg flex-grow text-center">Google</span>
          <div className="w-6"></div> {/* Empty div for spacing balance */}
        </button>
      </div>
    </div>
  )
}
