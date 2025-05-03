'use client'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { getProductsAction, updateProductActivationAction } from '../actions'

import { ProductItem } from '@/components/ProductItem'

export const ProductsOverview = () => {
  // State for tracking active status of products by their ID
  const [activeProducts, setActiveProducts] = useState<Record<string, boolean>>({})

  // Function to load products - replaced the direct await
  const [products, setProducts] = useState<any[]>([])

  // Track loading state for toggle operations
  const [loadingToggles, setLoadingToggles] = useState<Record<string, boolean>>({})

  // Load products on mount
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

  const handleToggleActive = async (productId: string, isActive: boolean) => {
    // Set loading state for this product
    setLoadingToggles((prev) => ({ ...prev, [productId]: true }))

    try {
      // Optimistically update the UI state
      setActiveProducts((prev) => ({
        ...prev,
        [productId]: isActive,
      }))

      // Call the server action to update the database
      const result = await updateProductActivationAction(Number(productId), isActive)

      if (!result.success) {
        // If the update failed, revert the UI state
        setActiveProducts((prev) => ({
          ...prev,
          [productId]: !isActive,
        }))

        // Show error toast
        toast.error(result.error || 'Failed to update product status')
      } else {
        // Show success toast
        toast.success(result.message || 'Product status updated successfully')
      }
    } catch (error) {
      // Revert the UI state on error
      setActiveProducts((prev) => ({
        ...prev,
        [productId]: !isActive,
      }))

      // Show error toast
      toast.error('An error occurred while updating product status')
      console.error('Error toggling product status:', error)
    } finally {
      // Clear loading state
      setLoadingToggles((prev) => ({ ...prev, [productId]: false }))
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {products?.map((product) => (
        <ProductItem
          key={product.id}
          item={product}
          onToggleActive={handleToggleActive}
          isActive={activeProducts[product.id]}
          isLoading={loadingToggles[product.id]}
          showToggle={true}
          showEdit={true}
        />
      ))}
    </div>
  )
}
