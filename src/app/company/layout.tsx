import Link from 'next/link'

import { auth } from '@/lib/utils/auth'

export default async function CompanyLayout({ children }: { children: React.ReactNode }) {
  await auth()

  const menu = [
    { name: 'Dashboard', href: '/company' },
    { name: 'Products', href: '/company/products/overview' },
    { name: 'Orders', href: '/company/orders' },
    { name: 'Settings', href: '/company/settings' },
    { name: 'Profile', href: '/company/profile' },
  ]

  return (
    <div className="grid grid-cols-3 xl:grid-cols-8 gap-4 min-h-[calc(100vh-5rem)]">
      <aside>
        <div className="flex flex-col sticky top-0">
          <h2 className="col-span-4 text-lg font-semibold my-4 h-7"></h2>
          <ul className="flex flex-col gap-4 text-xl card p-6">
            {menu.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <section className="col-span-2 xl:col-span-7 mt-6">{children}</section>
    </div>
  )
}
