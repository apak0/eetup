import Link from 'next/link'

import { auth } from '@/lib/utils/auth'

export default async function CompanyLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  const menu = [
    { name: 'Dashboard', href: '/company' },
    { name: 'Products', href: '/company/products' },
    { name: 'Orders', href: '/company/orders' },
    { name: 'Settings', href: '/company/settings' },
    { name: 'Profile', href: '/company/profile' },
  ]

  return (
    <div className="container mx-auto py-2">
      <div className="flex items-center py-4">
        <h2 className="col-span-4 text-xl font-semibold">Welcome, {session?.user?.name}</h2>
      </div>
      <div className="grid grid-cols-4 gap-4 min-h-[calc(100vh-5rem)]">
        <aside className="flex flex-col">
          <ul className="flex flex-col gap-4 text-2xl card shadow p-8">
            {menu.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </aside>
        <section className="col-span-3 rounded-lg card shadow">{children}</section>
      </div>
    </div>
  )
}
