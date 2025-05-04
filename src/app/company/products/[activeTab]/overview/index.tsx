'use client'
import { useEffect, useState } from 'react'

import { getProductsAction } from '../actions'

import { ProductItem } from '@/components/ProductItem'

export const ProductsOverview = () => {
  const [products, setProducts] = useState<any[]>([])

  const [activeProducts, setActiveProducts] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await getProductsAction()
      setProducts(fetchedProducts || [])

      // Initialize active status based on fetched products
      const initialActiveState: Record<string, boolean> = {}
      fetchedProducts?.forEach((product: any) => {
        initialActiveState[product.id] = product.active !== false
      })
      setActiveProducts(initialActiveState)
    }

    loadProducts()
  }, [])

  const handleToggleResult = (productId: string, isActive: boolean, success: boolean) => {
    if (success) {
      setActiveProducts((prev) => ({
        ...prev,
        [productId]: isActive,
      }))
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {products?.map((product) => (
        <ProductItem
          key={product.id}
          item={product}
          onToggleActive={handleToggleResult}
          isActive={activeProducts[product.id]}
          showToggle={true}
          showEdit={true}
        />
      ))}
    </div>
  )
}
