import Image from 'next/image'
import { DarkModeToggler } from './DarkModeToggler'
import { SignInButton } from './SignInButton'

export const TopBar = () => {
  return (
    <div className="flex justify-center h-20 w-full border-bottom shadow-md">
      <div className="flex items-center justify-between max-w-7xl px-6 flex-1">
        <Image
          width={150}
          height={150}
          priority
          alt="company-logo"
          src="https://neemmee.com/upload/all/c795cf71-102d-11f0-8710-9d51bec49cc1.png"
        />

        <div className="flex items-center gap-4">
          <SignInButton />
          <DarkModeToggler />
        </div>
      </div>
    </div>
  )
}
