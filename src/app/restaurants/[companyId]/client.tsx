'use client'

import { useState } from 'react'
import { Button } from '@headlessui/react'
import { Minus, Plus, ShoppingBasket, ShoppingCart, Trash2, X } from 'lucide-react'
import { redirect } from 'next/navigation'

import { ProductItem } from '@/components/ProductItem'
import Modal from '@/components/reusables/Modal'
import { Company } from '@/lib/database/type'

export function ClientRestaurantDetail({ companyData }: { companyData: Company }) {
  const savedBasket: any = JSON.parse(localStorage.getItem('savedBaskets') || '{}') || {}
  const [basket, setBasket] = useState<{ [k: string]: number }>(savedBasket[companyData.id] || {})

  const [basketMobileOpen, setBasketMobileOpen] = useState(false)

  const handleBasketChange = (products: any) => {
    localStorage.setItem('savedBaskets', JSON.stringify({ ...savedBasket, [companyData?.id]: products }))
    setBasket(products)
  }

  const basketComponent = (
    <div className="xl:sticky flex-1 top-4 max-h-[calc(100vh-173px)] bg-(--bg) shadow-lg border border-(--border-color) overflow-hidden">
      {Object.entries(basket)?.length > 0 ? (
        <div className="flex flex-col h-full gap-4 p-6 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <h2 className="text-xl w-full font-bold flex justify-center items-center gap-2">
              <ShoppingBasket className="text-orange-4" size={30} />
              <span>Your Order</span>
            </h2>
          </div>

          <div className="my-2" />

          <ul className="space-y-4 overflow-y-auto flex-1 pr-2 -mr-2">
            {Object.entries(basket)?.map(([productId, productQty]) => {
              const foundProduct = companyData.product.find((item: any) => item.id === Number(productId))
              return (
                <li
                  key={productId}
                  className="flex items-center justify-between p-3 rounded-xl bg-(--bg-secondary) transition-all duration-200 group"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{foundProduct.name}</span>
                    <span className="font-bold">€{foundProduct.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      className="btn-text bg-(--bg-secondary) text-sm size-8 text-red-1 hover:bg-red-1 hover:text-white"
                      onClick={() => {
                        const newBasket = { ...basket }
                        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                        delete newBasket[productId]
                        handleBasketChange(newBasket)
                      }}
                    >
                      <Trash2 size={20} />
                    </Button>
                    <Button
                      type="button"
                      className="btn-default  p-1 size-8 flex items-center justify-center"
                      onClick={() => {
                        if (basket[productId] > 1) {
                          handleBasketChange({ ...basket, [productId]: basket[productId] - 1 })
                        } else {
                          const newBasket = { ...basket }
                          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                          delete newBasket[productId]
                          handleBasketChange(newBasket)
                        }
                      }}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-6 text-center font-semibold">{productQty}</span>
                    <Button
                      type="button"
                      className="btn-default  p-1 size-8 flex items-center justify-center"
                      onClick={() => {
                        handleBasketChange({ ...basket, [productId]: basket[productId] + 1 })
                      }}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="my-2" />

          <div className="pt-3 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-xl font-bold">
                €
                {Object.entries(basket)
                  ?.reduce((acc, [productId, productQty]) => {
                    const foundProduct = companyData.product.find((item: any) => item.id === Number(productId))
                    return acc + foundProduct.price * productQty
                  }, 0)
                  .toFixed(2)}
              </span>
            </div>

            {/* <button className="w-full py-3 bg-orange-4 hover:bg-orange-5 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              <ShoppingCart size={18} />
              Checkout Now
            </button> */}

            <Button
              className="w-full"
              onClick={() => {
                redirect(`/restaurants/${companyData?.id}/checkout`)
              }}
            >
              Checkout
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-lg h-full flex flex-col">
          <h2 className="text-xl text-center font-bold mb-4">Your basket is empty</h2>
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
            <div className="bg-orange-1 p-6 rounded-full">
              <ShoppingCart size={48} className="text-orange-4" />
            </div>
            <p className="text-center font-medium max-w-xs">Add items from the menu to start your order</p>
          </div>
        </div>
      )}
    </div>
  )
  return (
    <div className="min-h-[calc(100vh-5rem)] py-6">
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="bg-orange-3 rounded-lg h-80"></div>
          <h1 className="px-4">{companyData.organization}</h1>
          <div className="bg-(--bg) rounded-lg shadow overflow-x-auto flex flex-col gap-4 p-4">
            <div className="">
              <h2 className="text-lg font-bold mb-2">Products</h2>
              <div className="grid  xl:grid-cols-2 gap-4">
                {companyData.product?.map((product: any) => (
                  <ProductItem
                    key={product.id}
                    item={product}
                    onAdd={() => {
                      handleBasketChange({ ...basket, [product.id]: (basket[product.id] || 0) + 1 })
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden   col-span-1 xl:flex flex-col">{basketComponent}</div>

        <Button className="xl:hidden fixed bottom-4 left-4 z-30 shadow" onClick={() => setBasketMobileOpen(!basketMobileOpen)}>
          {basketMobileOpen ? <X /> : <ShoppingBasket />}
        </Button>

        <Modal
          title=""
          okClick={() => {
            console.log('submit')
          }}
          open={basketMobileOpen}
          footer={false}
          className="max-w-md w"
          content={basketComponent}
          setOpen={(val) => {
            setBasketMobileOpen(val)
          }}
        />
      </div>
    </div>
  )
}
