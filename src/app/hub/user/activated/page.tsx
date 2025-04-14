import { CircleCheckBig } from 'lucide-react'
import Link from 'next/link'

export default function UserActivated() {
  return (
    <div className=" bg-(--bg) flex flex-col items-center justify-center min-h-screen mt-5 p-4">
      <div className=" p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <CircleCheckBig size={250} color="#07ed41" strokeWidth={1} />
        </div>
        <h1 className=" font-bold text-2xl mb-4">Email Verified Successfully!</h1>
        <p className="text-base mb-8">
          Your email has been successfully verified. You can now access all features of your account.
        </p>
        <Link href="/" className="btn mx-auto">
          Continue to Homepage
        </Link>
      </div>
    </div>
  )
}
