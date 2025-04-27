import { getProductsAction } from './actions'

import { ProductItem } from '@/components/ProductItem'

export default async function Restaurants() {
  const products = await getProductsAction()

  console.log('ahoy1', products)
  // Restaurant listing
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-16">
      <h1 className="mb-8">Welcome to our platform!</h1>
      <p>We are glad to have you here. Please explore our features and services.</p>
      <div className="max-w-full break-words">{products?.map((item) => <ProductItem key={item.id} item={item} />)}</div>
    </div>
  )
}
