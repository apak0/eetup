'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Switch } from '@headlessui/react'
import { Image as ImageKitImage } from '@imagekit/next'

import { updateProductActivationAction } from '@/app/company/products/[activeTab]/actions'

export const ProductItem = ({
  item,
  onToggleActive,
  isActive = item?.active !== false,
  isLoading: externalLoading = false,
  showToggle = false,
  showEdit = false,
}: {
  item: any
  onToggleActive?: (id: string, isActive: boolean, success: boolean) => void
  isActive?: boolean
  isLoading?: boolean
  showToggle?: boolean
  showEdit?: boolean
}) => {
  const [activeState, setActiveState] = useState(isActive)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleActive = async (newActiveState: boolean) => {
    // Prevent toggle while loading
    if (isLoading || externalLoading) return

    // Set loading state
    setIsLoading(true)

    try {
      // Optimistically update the UI state
      setActiveState(newActiveState)

      // Call the server action to update the database
      const result = await updateProductActivationAction(Number(item.id), newActiveState)

      if (!result.success) {
        // If the update failed, revert the UI state
        setActiveState(!newActiveState)

        // Show error toast
        toast.error(result.error || 'Failed to update product status')

        // Notify parent with status
        if (onToggleActive) {
          onToggleActive(item.id, !newActiveState, false)
        }
      } else {
        // Show success toast
        toast.success(result.message || 'Product status updated successfully')

        // Notify parent with status
        if (onToggleActive) {
          onToggleActive(item.id, newActiveState, true)
        }
      }
    } catch (error: any) {
      // Revert the UI state on error
      setActiveState(!newActiveState)

      // Show error toast
      toast.error('An error occurred while updating product status')
      console.error('Error toggling product status:', error)

      // Notify parent with status
      if (onToggleActive) {
        onToggleActive(item.id, !newActiveState, false)
      }
    } finally {
      // Clear loading state
      setIsLoading(false)
    }
  }

  // Combine internal and external loading states
  const isLoadingState = isLoading || externalLoading

  return (
    <div className="card p-4 shadow dark:border border-solid border-(--border-color) hover:shadow-lg transition cursor-pointer flex flex-col h-full">
      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
        {item.image && (
          <ImageKitImage src={item.image} width={400} height={400} alt={item.name || 'Product'} className="object-cover w-full h-full" />
        )}

        {showToggle && (
          <div className="absolute top-2 right-2 z-10">
            <div className="relative">
              <Switch
                checked={activeState}
                onChange={handleToggleActive}
                disabled={isLoadingState}
                className={`${
                  activeState ? 'bg-green-500' : 'bg-gray-400'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 ${
                  isLoadingState ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <span className="sr-only">{activeState ? 'Active' : 'Inactive'}</span>
                <span
                  className={`${
                    activeState ? 'translate-x-3' : '-translate-x-3'
                  } inline-block h-4 w-4 transform rounded-3xl bg-white transition-transform`}
                />
              </Switch>

              {isLoadingState && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                </div>
              )}
            </div>
          </div>
        )}

        {!activeState && !showToggle && (
          <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
            <span className="text-white font-bold py-1 px-3 bg-red-1 rounded-full">Pasif</span>
          </div>
        )}

        {item.discount_price && <div className="absolute top-2 left-2 bg-red-1 text-white text-sm font-bold py-1 px-2 rounded-md">İndirimli</div>}
      </div>

      <h3 className="font-medium">{item.name}</h3>

      <h6 className="">{item.description || 'There is not any order description.'}</h6>

      <div className="mt-auto">
        {item.categories && item.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.categories.map((catId: any) => (
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
            <span className="text-lg font-bold">{item.price} Є</span>
          </div>
        </div>

        {/* Active/inactive status indicator or Edit button */}
        {(showToggle || showEdit) && (
          <div className="flex justify-between items-center mt-2">
            {showToggle && (
              <div className={`mt-2 text-xs font-medium ${activeState ? 'text-green-600' : 'text-gray-500'}`}>
                Status: {activeState ? 'Active' : 'Inactive'} {isLoadingState && '(updating...)'}
              </div>
            )}
            {showEdit && (
              <div>
                <button className="whitespace-nowrap rounded-xl bg-primary text-white min-h-1 hover:bg-primary/90 transition">Edit</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
