import { getProductsAction } from '../actions'

import { ProductItem } from './ProductItem'

export const ProductsOverview = async () => {
  const products = await getProductsAction()

  return <div className="card rounded-ss-none py-8">{products?.map((item) => <ProductItem key={item.id} item={item} />)}</div>
}
