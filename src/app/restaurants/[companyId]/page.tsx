import { redirect } from 'next/navigation'

import { getCompanyWithProductsAction } from './actions'
import { ClientRestaurantDetail } from './client'

export default async function RestaurantDetail({ params }: { params: Promise<{ companyId: number }> }) {
  const { companyId } = await params
  const res = await getCompanyWithProductsAction(companyId)

  if (res?.error || !res?.data) {
    redirect('/restaurants')
  }
  const companyData = { ...res?.data, category: res.data?.category?.filter((catItem) => !!catItem.product.length) }

  return <ClientRestaurantDetail companyData={companyData} />
}
