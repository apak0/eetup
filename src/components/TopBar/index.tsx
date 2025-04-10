import Image from 'next/image'
import Link from 'next/link'

import { DarkModeToggler } from './DarkModeToggler'
import { SignInButton } from './sign-in'

export const TopBar = () => {
  return (
    <div className="flex justify-center h-20 w-full border-bottom shadow-md ">
      <div className="flex items-center justify-between max-w-app px-2 lg:px-10 flex-1">
        <Link href="/">
          <Image
            width={150}
            height={150}
            priority
            alt="company-logo"
            src="https://neemmee.com/upload/all/c795cf71-102d-11f0-8710-9d51bec49cc1.png"
            className="cursor-pointer"
          />
        </Link>

        <div className="flex items-center gap-4">
          <SignInButton />
          <DarkModeToggler />
        </div>
      </div>
    </div>
  )
}
