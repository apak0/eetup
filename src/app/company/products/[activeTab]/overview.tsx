'use client'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

import { getProductsAction } from './actions'

import { ProductItem } from '@/components/ProductItem'
import Loading from '@/components/reusables/Loading'

export const ProductsOverview = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      const fetchedProducts = await getProductsAction()
      setProducts(fetchedProducts || [])
      setLoading(false)
    }

    loadProducts()
  }, [])

  return (
    <div className="card rounded-ss-none py-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4">
        {products?.map((product) => (
          <ProductItem key={product.id} item={product} showToggle={true} onEdit={() => redirect(`/company/products/edit?productId=${product.id}`)} />
        ))}
      </div>
      <Loading show={loading} />
    </div>
  )
}
