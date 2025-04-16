import Link from 'next/link'

import { authenticateRequest } from '@/lib/utils/authenticate'

export default async function CompanyLayout({ children }: { children: React.ReactNode }) {
  const company = await authenticateRequest()
  console.log('ahoy1', company)

  const menu = [
    { name: 'Dashboard', href: '/company' },
    { name: 'Products', href: '/company/products' },
    { name: 'Orders', href: '/company/orders' },
    { name: 'Settings', href: '/company/settings' },
  ]

  
  return (
    <div className="grid grid-cols-4 gap-8 min-h-[calc(100vh-5rem)] py-8">
      <aside className="flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Welcome, {company?.organization}</h2>
        <ul className="flex flex-col gap-4 text-2xl card shadow p-8">
          {menu.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <section className="col-span-3">{children}</section>
    </div>
  )
}
