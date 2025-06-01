import Link from 'next/link'

import { getNearbyCompanies } from './actions'

import { CompanyItem } from '@/components/CompanyItem'

interface RestaurantsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function RestaurantsPage({ searchParams }: RestaurantsPageProps) {
  const { address } = searchParams
  const companies = await getNearbyCompanies(address as string)

  return (
    <div className="max-w-7xl min-h-screen px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Welcome to eetup</h1>
        <p className="text-gray-600">Discover local restaurants and order your favorite meals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies?.map((item) => (
          <Link key={item.id} href={`/restaurants/${item.id}`} className="block no-underline">
            <CompanyItem item={item} />
          </Link>
        ))}
        {(!companies || companies.length === 0) && (
          <div className="text-center py-8 col-span-full">
            <p className="text-gray-500">No restaurants found in this area. Try searching with a different address.</p>
          </div>
        )}
      </div>
    </div>
  )
}
