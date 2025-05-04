import { redirect } from 'next/navigation'

import { getProductsAction } from './actions'
import { ClientRestaurantDetail } from './client'

export default async function RestaurantDetail({ params }: { params: Promise<{ companyId: number }> }) {
  const { companyId } = await params
  const res = await getProductsAction(companyId)

  if (res?.error) {
    redirect('/restaurants')
  }

  return <ClientRestaurantDetail companyData={res?.data} />
}
