'use client'

import { useState } from 'react'
import { Button } from '@headlessui/react'
import { Minus, Plus, ShoppingBasket, ShoppingCart, X } from 'lucide-react'

import { ProductItem } from '@/components/ProductItem'
import Modal from '@/components/reusables/Modal'
import { Company } from '@/lib/database/type'

export function ClientRestaurantDetail({ companyData }: { companyData: Company }) {
  const [basket, setBasket] = useState<{ [k: string]: number }>({})

  const [basketMobileOpen, setBasketMobileOpen] = useState(false)

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
                  className="flex items-center justify-between p-3 rounded-xl bg-(--bg-secondary) hover:bg-(--bg-hover) transition-all duration-200 group"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{foundProduct.name}</span>
                    <span className="text-orange-5 font-bold">€{foundProduct.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="btn-default hover:bg-orange-4/100 hover:text-white p-1"
                      onClick={() => {
                        if (basket[productId] > 1) {
                          setBasket({ ...basket, [productId]: basket[productId] - 1 })
                        } else {
                          const newBasket = { ...basket }
                          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                          delete newBasket[productId]
                          setBasket(newBasket)
                        }
                      }}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-6 text-center font-semibold">{productQty}</span>
                    <button
                      type="button"
                      className="btn-default hover:bg-orange-4/100 hover:text-white p-1"
                      onClick={() => {
                        setBasket({ ...basket, [productId]: basket[productId] + 1 })
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="my-2" />

          <div className="pt-3 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-xl font-bold text-orange-5">
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

            <Button className="w-full">Checkout</Button>
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
                      setBasket({ ...basket, [product.id]: (basket[product.id] || 0) + 1 })
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
