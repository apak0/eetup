'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button, Checkbox, Field, Label } from '@headlessui/react'
import { Image as ImageKitImage } from '@imagekit/next'
import classNames from 'classnames'
import { CheckIcon, Minus, Plus, ShoppingBasket, ShoppingCart, Trash2, X } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Preference } from './type'

import { ProductPreference } from '@/app/company/products/[activeTab]/type'
import { useBasket } from '@/app/Providers'
import { MenuSearch } from '@/components/MenuSearch'
import { ProductItem } from '@/components/ProductItem'
import Modal from '@/components/reusables/Modal'
import { RadioGroup } from '@/components/reusables/RadioGroup'
import { Tag } from '@/components/reusables/Tag'
import { CompanyWithConnections } from '@/lib/database/type'

export function ClientRestaurantDetail({ companyData }: { companyData: CompanyWithConnections }) {
  const { savedBasket, setSavedBasket } = useBasket()
  const basket = savedBasket?.[companyData?.id] || []
  const [basketMobileOpen, setBasketMobileOpen] = useState(false)
  const [addToBasketOpen, setAddToBasketOpen] = useState(false)
  const [preference, setPreference] = useState<Preference>()
  const [errorElementId, setErrorElementId] = useState('')

  const session = useSession()

  const handleBasketChange = (products: any) => {
    if (!products?.length) {
      setSavedBasket?.({})
    } else {
      setSavedBasket?.({ [companyData?.id]: products })
    }
  }

  const basketComponent = (
    <div className="xl:sticky xl:max-h-[calc(100vh-173px)] h-[calc(100vh-50px)] flex-1 top-4  bg-(--bg) rounded-lg xl:border border-(--border-color)">
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
                  className="flex items-center justify-between gap-4 p-3 rounded-xl bg-(--bg-secondary) transition-all duration-200 group"
                >
                  <div className="flex-1 flex flex-col gap-2 w-[calc(100%-160px)]">
                    <div className="font-medium">{basketItem.name}</div>
                    {!!Object.values(basketItem.selections).length && (
                      <div className="flex flex-col gap-2 text-xs">
                        {Object.entries(basketItem.selections).map(([key, item]) => (
                          <div key={key} className="flex gap-1">
                            <div className="w-16 truncate" title={key}>
                              {key}:
                            </div>
                            <div key={key} className="flex-1 flex flex-col truncate">
                              {item?.map((opt) => (
                                <div key={opt.label} className="flex items-center gap-1">
                                  <div className="truncate" title={opt.label}>
                                    {opt.label}
                                  </div>
                                  {opt.price ? <span className="whitespace-nowrap">(+€ {opt.price})</span> : null}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="font-bold">€ {(parseFloat(basketItem.price || '0') * basketItem.qty).toFixed(2)}</div>
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

            <Button
              className="w-full"
              onClick={() => {
                if (session?.data?.user?.isCompany) {
                  toast.error('You cannot checkout as a company user. Please switch to a customer account.')
                } else {
                  redirect(`/restaurants/${companyData?.id}/checkout`)
                }
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
        <div className="flex flex-col ">
          {(preference.addCartPreferences as Array<any>)?.map((item: ProductPreference) => {
            const optionElId = 'addCartPreferencesOption' + item.label
            return (
              <div key={item.label} className="pb-4">
                <div className="flex items-center mb-2">
                  <h4 className="font-bold ">{item.label}</h4>
                  <span className="ml-auto">{item.isOptional ? <Tag>Optional</Tag> : <Tag className="bg-gray-5">Required</Tag>}</span>
                </div>
                <div
                  className={classNames('flex flex-col border rounded-lg border-gray-2 p-2', {
                    'border-red-1': errorElementId === optionElId,
                  })}
                  id={optionElId}
                >
                  {item.type === 'single_selection' ? (
                    <RadioGroup
                      onChange={(opt: any) => {
                        if (optionElId === errorElementId) {
                          setErrorElementId('')
                        }
                        setPreference({
                          ...preference,
                          selections: { ...preference.selections, [item.label]: [opt] },
                        })
                      }}
                      options={item.value}
                      render={(opt: any) => (
                        <div key={opt.label} className="flex items-center justify-between gap-2 flex-1">
                          <span className="text-sm">{opt.label}</span>
                          <span className="text-sm">{opt.price ? <>+€{opt.price}</> : 'Free'}</span>
                        </div>
                      )}
                    />
                  ) : (
                    item.value.map((opt: any) => {
                      return (
                        <Field className="group hover:bg-orange-1 dark:hover:bg-orange-2 rounded-lg" key={opt.label}>
                          <Label className="flex items-center justify-between gap-2 flex-1 px-3 py-2 cursor-pointer mb-0">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                onChange={(checked) => {
                                  if (optionElId === errorElementId) {
                                    setErrorElementId('')
                                  }

                                  if (checked) {
                                    setPreference({
                                      ...preference,
                                      selections: { ...preference.selections, [item.label]: [...(preference.selections?.[item.label] || []), opt] },
                                    })
                                  } else {
                                    setPreference({
                                      ...preference,
                                      selections: {
                                        ...preference.selections,
                                        [item.label]: (preference.selections[item.label] || []).filter((item: any) => item.label !== opt.label),
                                      },
                                    })
                                  }
                                }}
                                className="checkbox group size-5 rounded-md p-0.5 border-1 border-(--border-color) flex items-center justify-center group-hover:bg-orange-1 data-checked:bg-orange-1 transition-colors duration-200"
                              >
                                <CheckIcon strokeWidth={3} className="hidden group-data-checked:block text-orange-3" />
                              </Checkbox>
                              {opt.label}
                            </div>

                            <span className="text-sm">{opt.price ? <>+€{opt.price}</> : 'Free'}</span>
                          </Label>
                        </Field>
                      )
                    })
                  )}
                </div>
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
              const isValid = (preference.addCartPreferences as Array<any>).every((item: ProductPreference) => {
                if (!item.isOptional && !preference.selections?.[item.label]?.length) {
                  const elId = 'addCartPreferencesOption' + item.label
                  const el = document.getElementById(elId)
                  setErrorElementId(elId)
                  if (!el) return true
                  scrollTo({
                    top: el?.offsetTop,
                    behavior: 'smooth',
                  })
                  el.classList.toggle('border-red-1', true)
                  return false
                }
                return true
              })
              if (!isValid) {
                toast.error('Please select all required options')
                return
              }

              setPreference(undefined)
              setAddToBasketOpen(false)
              const calculatedPreference = {
                ...preference,
                price: (
                  parseFloat(preference.price || '0') +
                  Object.values(preference.selections)
                    .flat()
                    .reduce((acc, item) => {
                      return acc + parseFloat(item.price || '0')
                    }, 0)
                ).toFixed(2),
              }
              const foundBasketItem = basket.find((item) => JSON.stringify(item) === JSON.stringify(calculatedPreference))
              if (foundBasketItem) {
                const newBasket = basket.map((item) => {
                  if (JSON.stringify(item) === JSON.stringify(calculatedPreference)) {
                    return { ...item, qty: item.qty + calculatedPreference.qty }
                  }
                  return item
                })
                handleBasketChange(newBasket)
              } else {
                handleBasketChange([...basket, calculatedPreference])
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
          <div className="bg-(--bg) rounded-lg border border-(--border-color) flex flex-col gap-4 p-4">
            <MenuSearch
              tabs={
                companyData?.category?.map((catItem) => ({
                  id: catItem.id,
                  label: catItem.name,
                  items: catItem?.product.map((product) => (
                    <ProductItem
                      key={product.id}
                      item={product}
                      onAdd={() => {
                        setAddToBasketOpen(true)
                        setPreference({ ...product, selections: {}, qty: 1 })
                      }}
                    />
                  )),
                })) || []
              }
            />
          </div>
        </div>
        <div className="hidden col-span-1 xl:flex flex-col">{basketComponent}</div>

        {!basket?.length || basketMobileOpen ? null : (
          <Button className="xl:hidden fixed right-1/2 top-2 z-30" onClick={() => setBasketMobileOpen(!basketMobileOpen)}>
            <ShoppingBasket />
          </Button>
        )}

        <Modal
          okClick={() => {
            console.log('submit')
          }}
          title={
            <div className="flex items-center justify-center mb-2">
              <h2 className="text-xl w-full font-bold flex justify-center items-center gap-2">
                <ShoppingBasket className="text-orange-4" size={30} />
                <span>Your Order</span>
              </h2>
              <Button className="xl:hidden ml-auto size-10 p-2" onClick={() => setBasketMobileOpen(!basketMobileOpen)}>
                <X />
              </Button>
            </div>
          }
          footer={false}
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
