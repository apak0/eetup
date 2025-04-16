import Link from 'next/link'

import { authenticateRequest } from '@/lib/utils/authenticate'

export default async function CompanyLayout({ children }: { children: React.ReactNode }) {
  const user = await authenticateRequest()
  console.log('ahoy1', user)

  const menu = [
    { name: 'Dashboard', href: '/company' },
    { name: 'Products', href: '/company/products' },
    { name: 'Orders', href: '/company/orders' },
    { name: 'Settings', href: '/company/settings' },
  ]

  return (
    <div className="grid grid-cols-4 gap-8 min-h-[calc(100vh-5rem)] py-16">
      <aside className="card shadow p-8">
        <ul className="flex flex-col gap-4 text-2xl">
          {menu.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="px-4 py-2">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <section className="col-span-3">{children}</section>
    </div>
  )
}
