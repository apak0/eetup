'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Switch } from '@headlessui/react'
import { Image as ImageKitImage } from '@imagekit/next'
import classNames from 'classnames'
import { Edit, Plus } from 'lucide-react'

import { OverflowingText } from './reusables/OverflowingText'

import { updateProductActivationAction } from '@/app/company/products/[activeTab]/actions'
import { productCategories } from '@/lib/database/constants'

export const ProductItem = ({
  item,
  showToggle = false,
  onEdit,
  onAdd,
}: {
  item: any
  showToggle?: boolean
  onEdit?: () => void
  onAdd?: () => void
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const [isActive, setIsActive] = useState(item.active !== false)

  const handleToggleActive = async (newActiveState: boolean) => {
    setIsActive(!isActive)
    setIsLoading(true)
    const response = await updateProductActivationAction(item.id, newActiveState)
    setIsLoading(false)
    if (response.error) {
      setIsActive(isActive)
      toast.error(response.message)
    } else {
      toast.success(response.message)
    }
  }

  return (
    <div
      className="group card p-3 border border-solid border-(--border-color) transition cursor-pointer flex gap-2 h-full"
      onClick={() => {
        if (onAdd) {
          onAdd()
        }
        if (onEdit) {
          onEdit()
        }
      }}
    >
      <div className="flex flex-col gap-0.5 flex-1">
        <h5 className="font-bold">{item.name}</h5>
        <div className="flex justify-between items-center">{item.price} €</div>
        <div className="text-xs">
          <OverflowingText className="line-clamp-2">{item.description || 'There is not any order description.'}</OverflowingText>
        </div>
        <div>
          {item.categories && item.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.categories.map((catId: any) => (
                <span key={catId} className="text-xs py-0.5 px-2 rounded-md bg-orange-1 text-orange-5 ">
                  {productCategories.find((cat) => cat.value === catId)?.label || 'Unknown'}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="mt-auto flex gap-2">
          {onEdit && (
            <div className="btn-default group-hover:bg-orange-4/100 group-hover:text-white p-1">
              <Edit size={20} />
            </div>
          )}
          {onAdd && (
            <div className="btn-default group-hover:bg-orange-4/100 group-hover:text-white p-1">
              <Plus size={20} />
            </div>
          )}
        </div>
      </div>
      <div className="relative h-40 overflow-hidden rounded-lg">
        {item.image && <ImageKitImage src={item.image} width={200} height={200} alt={item.name || 'Product'} className="object-cover w-40 h-40" />}

        {showToggle && (
          <div className="absolute top-2 right-2 z-10">
            <div className="relative">
              <Switch
                checked={isActive}
                onClick={(e) => e.stopPropagation()}
                onChange={handleToggleActive}
                disabled={isLoading}
                className={classNames('relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2', {
                  'bg-green-500': isActive,
                  'bg-gray-400': !isActive,
                  'opacity-70 cursor-not-allowed': isLoading,
                })}
              >
                <span className="sr-only">{isActive ? 'Active' : 'Inactive'}</span>
                <span
                  className={classNames('inline-block h-4 w-4 transform rounded-3xl bg-white transition-transform', {
                    'translate-x-3': isActive,
                    '-translate-x-3': !isActive,
                  })}
                />
              </Switch>

              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
