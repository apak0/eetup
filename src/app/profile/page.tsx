'use client'
import { signOut, useSession } from 'next-auth/react'

export default function Profile() {
  const { data: session } = useSession()

  if (session) {
    return <>{session?.user?.name}</>
  }

  return (
    <>
      <div className="mt-6 grid gap-4">
        <button
          onClick={() => signOut()}
          className="flex w-full justify-center items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Sign Out
        </button>
      </div>
    </>
  )
}
