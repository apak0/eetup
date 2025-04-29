import Link from 'next/link'

import { getNearbyCompanies } from './actions'

import { CompanyItem } from '@/components/CompanyItem'

interface RestaurantsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function RestaurantsPage({ searchParams }: RestaurantsPageProps) {
  const { address } = searchParams
  const companies = await getNearbyCompanies(address as string)

  // Restaurant listing
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-16">
      <h1 className="mb-8">Welcome to our platform!</h1>
      <p>We are glad to have you here. Please explore our features and services.</p>
      <div className="max-w-full break-words">
        {companies?.map((item) => (
          <Link key={item.id} href={`/restaurants/${item.id}`}>
            <CompanyItem item={item} />
          </Link>
        ))}
      </div>
    </div>
  )
}
