'use client'
import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import Image from 'next/image'

import { getProductsAction } from '../actions'

export const ProductsOverview = () => {
  // State for tracking active status of products by their ID
  const [activeProducts, setActiveProducts] = useState<Record<string, boolean>>({})

  // Function to load products - replaced the direct await
  const [products, setProducts] = useState<any[]>([])

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await getProductsAction()
      setProducts(fetchedProducts || [])

      // Initialize active status - assuming all products are active by default
      const initialActiveState: Record<string, boolean> = {}
      fetchedProducts?.forEach((product: any) => {
        initialActiveState[product.id] = product.isActive !== false // default to true if not specified
      })
      setActiveProducts(initialActiveState)
    }

    loadProducts()
  }, [])

  const handleToggleActive = (productId: string, isActive: boolean) => {
    setActiveProducts((prev) => ({
      ...prev,
      [productId]: isActive,
    }))

    // Here you would typically make an API call to update the product status
    // For example: updateProductStatusAction(productId, isActive)
    console.log(`Product ${productId} is now ${isActive ? 'active' : 'inactive'}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {products?.map((product) => (
        <div
          key={product.id}
          className="card p-4 shadow dark:border border-solid border-(--border-color) hover:shadow-lg transition cursor-pointer flex flex-col h-full"
        >
          <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
            {product.image && <Image src={product.image} alt={product.name} fill className="object-cover w-full h-full" />}

            {/* Toggle switch in the top right corner of the image */}
            <div className="absolute top-2 right-2 z-10">
              <Switch
                checked={activeProducts[product.id] || false}
                onChange={(isActive) => handleToggleActive(product.id, isActive)}
                className={`${
                  activeProducts[product.id] ? 'bg-green-500' : 'bg-gray-400'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                <span className="sr-only">{activeProducts[product.id] ? 'Active' : 'Inactive'}</span>
                <span
                  className={`${
                    activeProducts[product.id] ? 'translate-x-3' : '-translate-x-3'
                  } inline-block h-4 w-4 transform rounded-3xl bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>

          <h3 className="font-medium">{product.name}</h3>

          <h6 className="">{product.description || 'There is not any order description.'}</h6>

          <div className="mt-auto">
            {product.categories && product.categories.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {product.categories.map((catId: any) => (
                  <span
                    key={catId}
                    className="text-xs py-0.5 px-2 rounded-md dark:border border-solid border-(--border-color)
                    bg-orange-1 text-orange-5 dark:bg-orange-5/20 dark:text-white dark:border-orange-3/20"
                  >
                    {catId}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center">
              <div>
                {product.discount_price ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{product.discount_price} ₺</span>
                    <span className="text-sm text-gray-500 line-through">{product.price} ₺</span>
                  </div>
                ) : (
                  <span className="text-lg font-bold">{product.price} Є</span>
                )}
              </div>
            </div>

            {/* Active/inactive status indicator */}
            <div className="flex justify-between items-center mt-2">
              <div className={`mt-2 text-xs font-medium ${activeProducts[product.id] ? 'text-green-600' : 'text-gray-500'}`}>
                Status: {activeProducts[product.id] ? 'Active' : 'Inactive'}
              </div>
              <div>
                <button className="whitespace-nowrap rounded-xl bg-primary text-white min-h-1 hover:bg-primary/90 transition ">Edit</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
