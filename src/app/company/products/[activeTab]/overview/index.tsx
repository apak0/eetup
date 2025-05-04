'use client'
import { useEffect, useState } from 'react'

import { getProductsAction } from '../actions'

import { ProductItem } from '@/components/ProductItem'

export const ProductsOverview = () => {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await getProductsAction()
      setProducts(fetchedProducts || [])

      const initialActiveState: Record<string, boolean> = {}
      fetchedProducts?.forEach((product: any) => {
        initialActiveState[product.id] = product.active !== false
      })
    }

    loadProducts()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {products?.map((product) => <ProductItem key={product.id} item={product} showToggle={true} showEdit={true} />)}
    </div>
  )
}
