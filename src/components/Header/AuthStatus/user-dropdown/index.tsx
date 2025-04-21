'use client'
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react'
import { Crown, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import './style.css'

export const UserDropdown = () => {
  const session = useSession()
  const user = session?.data?.user
  const initials = `${(session?.data?.user?.firstName || '')?.charAt(0).toUpperCase()}${(session?.data?.user?.lastName || '')?.charAt(0).toUpperCase()}`

  return (
    <Menu>
      <MenuButton className="btn-text dropdown-content data-open:rounded-lg! group">
        <div className="avatar group-data-open:rounded-md!">{initials}</div>
      </MenuButton>
      <MenuItems
        anchor={{ to: 'bottom end', gap: '5px' }}
        className="flex flex-col bg-(--bg) rounded-xl py-1 drop-shadow-2xl dark:border border-(--border-color)"
      >
        {user?.isCompany && (
          <MenuItem>
            <Link className="btn-text flex items-center rounded-full h-8 my-1 mx-2 py-2 px-3 hover:bg-orange-1 gap-4 justify-start" href="/company">
              <Crown size={20} />
              Company
            </Link>
          </MenuItem>
        )}
        {user?.isCompany && (
          <MenuItem>
            <Link className="btn-text flex items-center rounded-full h-8 my-1 mx-2 py-2 px-3 hover:bg-orange-1 gap-4 justify-start" href="/company">
              <User size={20} />
              Profile
            </Link>
          </MenuItem>
        )}
        <MenuSeparator className="my-1 h-px border-bottom " />
        <MenuItem>
          <button
            className="h-8 btn-text my-1 mx-2 py-2 px-3 hover:bg-orange-1 gap-4 justify-start"
            onClick={() => {
              signOut({ callbackUrl: '/' })
            }}
          >
            <LogOut size={20} />
            Sign out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
