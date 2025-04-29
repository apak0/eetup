import { getProductsAction } from './actions'

import { ProductItem } from '@/components/ProductItem'

export default async function RestaurantDetail({ params }: { params: Promise<{ companyId: number }> }) {
  const { companyId } = await params
  const products = await getProductsAction(companyId)

  // Restaurant Menu
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-16">
      <h1 className="mb-8">{companyId}</h1>
      <p>Restaurant Menu</p>
      <div className="max-w-full break-words">{products?.map((item) => <ProductItem key={item.id} item={item} />)}</div>
    </div>
  )
}
