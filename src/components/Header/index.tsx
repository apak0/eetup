import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

import { AuthStatus } from './AuthStatus'
import { DarkModeToggler } from './DarkModeToggler'

export const Header = async () => {
  const cookieStore = await cookies()
  const theme: any = cookieStore.get('theme')?.value

  // TODO: authenticate user and replace sign in button with user profile
  return (
    <div className="flex justify-center h-17 w-full border-bottom shadow-md bg-(--bg)">
      <div className="flex items-center justify-between max-w-app px-2 lg:px-10 flex-1">
        <Link href="/">
          <Image width={70} height={70} priority alt="company-logo" src="/LOGO.png" className="cursor-pointer" />
        </Link>

        <div className="flex items-center gap-6">
          <AuthStatus />
          <DarkModeToggler preferredTheme={theme} />
        </div>
      </div>
    </div>
  )
}
