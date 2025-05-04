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
    <div className="xl:sticky flex-1 top-4 max-h-[calc(100vh-173px)] bg-(--bg) rounded-lg shadow">
      {Object.entries(basket)?.length > 0 ? (
        <div className="flex flex-col h-full gap-4 p-4 rounded-lg">
          <h2 className="text-lg font-bold">Basket</h2>
          <ul>
            {Object.entries(basket)?.map(([productId, productQty]) => {
              const foundProduct = companyData.product.find((item: any) => item.id === Number(productId))
              return (
                <li key={productId} className="flex justify-between">
                  <span>{foundProduct.name}</span>
                  <span className="font-bold">€{foundProduct.price}</span>
                  <div className="flex items-center justify-end gap-2 w-40">
                    <Button
                      type="button"
                      className="h-6 px-2 btn-default"
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
                    </Button>
                    <span className="min-w-6 text-center">{productQty}</span>
                    <Button
                      type="button"
                      className="h-6 px-2"
                      onClick={() => {
                        setBasket({ ...basket, [productId]: basket[productId] + 1 })
                      }}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold">
              €
              {Object.entries(basket)?.reduce((acc, [productId, productQty]) => {
                const foundProduct = companyData.product.find((item: any) => item.id === Number(productId))
                return acc + foundProduct.price * productQty
              }, 0)}
            </span>
          </div>
          <Button className="w-full">Checkout</Button>
        </div>
      ) : (
        <div className="p-4 rounded-lg h-full flex flex-col ">
          <h2 className="text-lg font-bold">Basket is empty</h2>
          <ShoppingCart size={48} className="m-auto opacity-20" />
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
          title="Basket"
          okClick={() => {
            console.log('submit')
          }}
          open={basketMobileOpen}
          footer={false}
          className="max-w-md"
          content={basketComponent}
          setOpen={(val) => {
            setBasketMobileOpen(val)
          }}
        />
      </div>
    </div>
  )
}
