'use client'

import { useState } from 'react'
import { Button } from '@headlessui/react'
import { Image as ImageKitImage } from '@imagekit/next'
import { Minus, Plus, ShoppingBasket, ShoppingCart, Trash2, X } from 'lucide-react'
import { redirect } from 'next/navigation'

import { ProductPreference } from '@/app/company/products/[activeTab]/type'
import { ProductItem } from '@/components/ProductItem'
import Modal from '@/components/reusables/Modal'
import { RadioGroup } from '@/components/reusables/RadioGroup'
import { Tag } from '@/components/reusables/Tag'
import { CompanyWithProduct, Product } from '@/lib/database/type'

type Preference = Product & {
  qty: number
  selections: { preferenceLabel: string; selection: { label: string; price: string } }[]
}

export function ClientRestaurantDetail({ companyData }: { companyData: CompanyWithProduct }) {
  const savedBasket: any = JSON.parse(localStorage.getItem('savedBaskets') || '{}') || {}
  const [basket, setBasket] = useState<Preference[]>(savedBasket[companyData.id] || [])

  const [basketMobileOpen, setBasketMobileOpen] = useState(false)
  const [addToBasketOpen, setAddToBasketOpen] = useState(false)
  const [preference, setPreference] = useState<Preference>()

  const handleBasketChange = (products: any) => {
    localStorage.setItem('savedBaskets', JSON.stringify({ ...savedBasket, [companyData?.id]: products }))
    setBasket(products)
  }

  console.log('ahoy21 basket', basket)

  const basketComponent = (
    <div className="xl:sticky xl:max-h-[calc(100vh-173px)] h-[calc(100vh-20px)] flex-1 top-4  bg-(--bg) rounded-lg border border-(--border-color)">
      {Object.entries(basket)?.length > 0 ? (
        <div className="flex flex-col h-full gap-4 p-6 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <h2 className="text-xl w-full font-bold flex justify-center items-center gap-2">
              <ShoppingBasket className="text-orange-4" size={30} />
              <span>Your Order</span>
            </h2>
          </div>

          <ul className="space-y-4 overflow-y-auto pr-2 -mr-2">
            {Object.values(basket)?.map((basketItem) => {
              return (
                <li
                  key={basketItem.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-(--bg-secondary) transition-all duration-200 group"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{basketItem.name}</span>
                    <span className="flex flex-col text-sm">
                      {!!basketItem.selections?.length &&
                        basketItem.selections.map((item) => (
                          <span key={item.preferenceLabel} className="text-xs">
                            {item.preferenceLabel}: {item.selection.label} {item.selection.price ? <>(+€ {item.selection.price})</> : null}
                          </span>
                        ))}
                    </span>
                    <span className="font-bold">€ {(parseFloat(basketItem.price || '0') * basketItem.qty).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      className="btn-text bg-(--bg-secondary) text-sm size-8 text-red-1 hover:bg-red-1 hover:text-white"
                      onClick={() => {
                        const newBasket = basket.filter((item) => JSON.stringify(item) !== JSON.stringify(basketItem))
                        handleBasketChange(newBasket)
                      }}
                    >
                      <Trash2 size={20} />
                    </Button>
                    <Button
                      type="button"
                      className="btn-default  p-1 size-8 flex items-center justify-center data-disabled:cursor-not-allowed data-disabled:opacity-30"
                      disabled={basketItem.qty <= 1}
                      onClick={() => {
                        const newBasket = basket.map((item) => {
                          if (JSON.stringify(item) === JSON.stringify(basketItem)) {
                            return { ...item, qty: item.qty - 1 }
                          }
                          return item
                        })
                        handleBasketChange(newBasket)
                      }}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-6 text-center font-semibold">{basketItem.qty}</span>
                    <Button
                      type="button"
                      className="btn-default  p-1 size-8 flex items-center justify-center"
                      onClick={() => {
                        const newBasket = basket.map((item) => {
                          if (JSON.stringify(item) === JSON.stringify(basketItem)) {
                            return { ...item, qty: item.qty + 1 }
                          }
                          return item
                        })
                        handleBasketChange(newBasket)
                      }}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="space-y-4 mt-auto">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-xl font-bold">
                €{' '}
                {Object.values(basket)
                  ?.reduce((acc, basketItem) => {
                    return acc + parseFloat(basketItem.price || '0') * basketItem.qty
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

  const addToBasketComponent = preference && (
    <div className="flex flex-col">
      {preference.image && (
        <ImageKitImage src={preference.image} width={500} height={500} alt={preference.name || 'Product'} className="object-cover w-full h-60" />
      )}
      <div className="flex flex-col gap-4 p-4">
        <h3 className="font-bold">{preference.name}</h3>
        <div className="flex flex-col divide-y divide-(--border-color) space-y-4">
          {(preference.addCartPreferences as Array<any>)?.map((item: ProductPreference) => {
            return (
              <div key={item.label} className="pb-4">
                <h4 className="mb-2">
                  {item.label} {item.isOptional ? <Tag>Optional</Tag> : <Tag className="bg-gray-5">Required</Tag>}
                </h4>
                {item.isOptional ? (
                  <RadioGroup
                    onChange={(opt: any) => {
                      const foundSelection = preference.selections?.find((selection) => selection.preferenceLabel === item.label)
                      if (foundSelection) {
                        setPreference({
                          ...preference,
                          selections: preference.selections.map((selection) => {
                            if (selection.preferenceLabel === item.label) {
                              return { ...selection, selection: opt }
                            }
                            return selection
                          }),
                        })
                      } else {
                        setPreference({
                          ...preference,
                          selections: [...(preference.selections || []), { preferenceLabel: item.label, selection: opt }],
                        })
                      }
                    }}
                    options={item.value}
                    render={(opt: any) => (
                      <div key={opt.label} className="flex items-center justify-between gap-2 flex-1">
                        <span className="text-sm">{opt.label}</span>
                        {opt.price ? <span className="text-sm">+€ {opt.price}</span> : 'Free'}
                      </div>
                    )}
                  />
                ) : (
                  <RadioGroup
                    onChange={(opt: any) => {
                      const foundSelection = preference.selections.find((selection) => selection.preferenceLabel === item.label)
                      if (foundSelection) {
                        setPreference({
                          ...preference,
                          selections: preference.selections.map((selection) => {
                            if (selection.preferenceLabel === item.label) {
                              return { ...selection, selection: opt }
                            }
                            return selection
                          }),
                        })
                      } else {
                        setPreference({
                          ...preference,
                          selections: [...preference.selections, { preferenceLabel: item.label, selection: opt }],
                        })
                      }
                    }}
                    options={item.value}
                    render={(opt: any) => (
                      <div key={opt.label} className="flex items-center justify-between gap-2 flex-1">
                        <span className="text-sm">{opt.label}</span>
                        {opt.price ? <span className="text-sm">+€ {opt.price}</span> : 'Free'}
                      </div>
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            disabled={preference.qty <= 1}
            className="btn-default  p-1 size-8 flex items-center justify-center"
            onClick={() => {
              setPreference({
                ...preference,
                qty: preference.qty - 1,
              })
            }}
          >
            <Minus size={16} />
          </Button>
          <span className="w-6 text-center font-semibold">{preference.qty}</span>
          <Button
            type="button"
            className="btn-default  p-1 size-8 flex items-center justify-center"
            onClick={() => {
              setPreference({
                ...preference,
                qty: preference.qty + 1,
              })
            }}
          >
            <Plus size={16} />
          </Button>

          <Button
            className="w-full"
            onClick={() => {
              setPreference(undefined)
              setAddToBasketOpen(false)
              const foundBasketItem = basket.find((item) => JSON.stringify(item) === JSON.stringify(preference))
              if (foundBasketItem) {
                const newBasket = basket.map((item) => {
                  if (JSON.stringify(item) === JSON.stringify(preference)) {
                    return { ...item, qty: item.qty + preference.qty }
                  }
                  return item
                })
                handleBasketChange(newBasket)
              } else {
                handleBasketChange([
                  ...basket,
                  {
                    ...preference,
                    price: (
                      parseFloat(preference.price || '0') +
                      preference.selections.reduce((acc, item) => {
                        return acc + parseFloat(item.selection.price || '0')
                      }, 0)
                    ).toFixed(2),
                  },
                ])
              }
            }}
          >
            Add to Basket
          </Button>
        </div>
      </div>
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
                      setAddToBasketOpen(true)
                      setPreference({ ...product, qty: 1 })
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden col-span-1 xl:flex flex-col">{basketComponent}</div>

        <Button className="xl:hidden fixed bottom-4 left-4 z-30 shadow" onClick={() => setBasketMobileOpen(!basketMobileOpen)}>
          {basketMobileOpen ? <X /> : <ShoppingBasket />}
        </Button>

        <Modal
          okClick={() => {
            console.log('submit')
          }}
          footer={false}
          className="max-w-md"
          content={basketComponent}
          open={basketMobileOpen}
          setOpen={(val) => {
            setBasketMobileOpen(val)
          }}
        />
        <Modal
          okClick={() => {
            console.log('submit')
          }}
          footer={false}
          className="max-w-md"
          content={addToBasketComponent}
          open={addToBasketOpen}
          setOpen={(val) => {
            setAddToBasketOpen(val)
          }}
        />
      </div>
    </div>
  )
}
