import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

import { AuthStatus } from './AuthStatus'
import { DarkModeToggler } from './DarkModeToggler'
import { Search } from './Search'

export const Header = async () => {
  const cookieStore = await cookies()
  const theme: any = cookieStore.get('theme')?.value

  return (
    <div className="flex justify-center h-15 w-full border-bottom shadow-md bg-(--bg)">
      <div className="grid grid-cols-2 items-center max-w-app px-2 lg:px-10 flex-1">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Image
              width={60}
              height={60}
              priority
              alt="company-logo"
              src="/LOGO.png"
              className="cursor-pointer"
              style={{ height: 'auto', width: 'auto' }}
            />
          </Link>
          <Search />
        </div>
        <div className="flex justify-end items-center gap-6 w-full">
          <AuthStatus />
          <DarkModeToggler preferredTheme={theme} />
        </div>
      </div>
    </div>
  )
}
