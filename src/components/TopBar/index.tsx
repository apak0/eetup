import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

import { DarkModeToggler } from './DarkModeToggler'
import { SignInButton } from './sign-in'

export const TopBar = async () => {
  const cookieStore = await cookies()
  const theme: any = cookieStore.get('theme')?.value

  return (
    <div className="flex justify-center h-20 w-full border-bottom shadow-md ">
      <div className="flex items-center justify-between max-w-app px-2 lg:px-10 flex-1">
        <Link href="/">
          <Image width={70} height={70} priority alt="company-logo" src="/LOGO.png" className="cursor-pointer" />
        </Link>

        <div className="flex items-center gap-6">
          <SignInButton />
          <DarkModeToggler preferredTheme={theme} />
        </div>
      </div>
    </div>
  )
}
