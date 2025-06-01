'use client'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Button, Field, Fieldset, Input, Label, Switch, Textarea } from '@headlessui/react'
import {
  Image as ImageKitImage,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from '@imagekit/next'
import classNames from 'classnames'
import { ArrowBigDownDash, ArrowRight, BookPlus, ImageUp, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { createCategoryAction, createProductAction, editProductAction } from './actions'
import { ProductPreference } from './type'

import Modal from '@/components/reusables/Modal'
import Select from '@/components/reusables/Select'
import { productAllergens, productDietary } from '@/lib/database/constants'
import { Category, Product } from '@/lib/database/type'
import { validateImageFile } from '@/lib/utils/validateImageSize'

export const CreateEditProduct = ({ productData, categoryOptions }: { productData?: Product; categoryOptions: Category[] }) => {
  const isEdit = !!productData
  const router = useRouter()
  const session = useSession()

  const inputRef = useRef<HTMLInputElement>(null)
  const [progress, setProgress] = useState(0)

  const [isUploading, setIsUploading] = useState(false)
  const [categoryModalInput, setCategoryModalInput] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [previewFile, setPreviewFile] = useState<any>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(productData?.image || null)
  const [formValues, setFormValues] = useState({
    name: productData?.name || '',
    description: productData?.description || '',
    price: productData?.price || '',
    image: productData?.image || null,
    categoryId: productData?.categoryId || null,
    allergens: productData?.allergens || [],
    dietary: productData?.dietary || [],
    addCartPreferencesChecked: productData?.addCartPreferencesChecked || false,
    addCartPreferences: (productData?.addCartPreferences as Array<any>) || [{ type: 'single_selection' }],
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name
    const value = event.target.value
    if (name === 'price') {
      if (!/^(\d+(\.\d{0,2})?)?$/.test(value)) return
    }
    handleChange(name, value)
  }
  const handleChange = (name: string, value: any) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const imageKitAuthenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch('/api/auth/image-kit')
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text()
        throw new Error(`Request failed with status ${response.status}: ${errorText}`)
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json()
      const { signature, expire, token, publicKey } = data
      return { signature, expire, token, publicKey }
    } catch (_e) {
      throw new Error('Authentication request failed')
    }
  }

  const onProgress = (event: any) => {
    setProgress((event.loaded / event.total) * 100)
  }

  const validateForm = () => {
    if (
      formValues.addCartPreferences.some((preference: ProductPreference, index) =>
        formValues.addCartPreferences.find((item, idx) => item.label === preference.label && index !== idx),
      )
    ) {
      toast.error('Preference labels need to be unique')
      return false
    } else if (formValues.addCartPreferences.some((preference) => !preference.value?.length)) {
      toast.error('Please add at least one option for each preference')
      return false
    }
    return true
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateForm()) return

    if (!previewUrl) {
      toast.error('Please select an image for the product')
      return
    }

    setIsUploading(true)
    try {
      const { signature, expire, token, publicKey } = await imageKitAuthenticator()

      const uploadResponse = formValues.image
        ? { url: formValues.image }
        : await upload({
            expire,
            token,
            signature,
            publicKey,
            file: previewFile,
            fileName: formValues.name?.replaceAll(' ', '_'),
            folder: `products/${session?.data?.user?.organization?.replaceAll(' ', '_')}/`,
            onProgress,
          })

      if (uploadResponse?.url) {
        handleChange('image', uploadResponse?.url)
        const body = { ...formValues, image: uploadResponse?.url }
        if (isEdit) {
          await editProductAction(body, productData.id)
        } else {
          await createProductAction(body)
        }
      } else {
        throw new Error('Image upload failed. Please try with another image.')
      }

      toast.success(isEdit ? 'Product is updated successfully!' : 'Product is created successfully!')
      setIsUploading(false)
      router.refresh()
      router.push('/company/products/overview')
    } catch (error) {
      let errorMesssage = ''
      if (error instanceof ImageKitAbortError) {
        errorMesssage = 'Upload aborted: ' + error.reason
      } else if (error instanceof ImageKitInvalidRequestError) {
        errorMesssage = 'Invalid request: ' + error.message
      } else if (error instanceof ImageKitUploadNetworkError) {
        errorMesssage = 'Network error: ' + error.message
      } else if (error instanceof ImageKitServerError) {
        errorMesssage = 'Server error: ' + error.message
      } else {
        errorMesssage = 'Upload failed: ' + error
      }
      toast.error(errorMesssage)
      setIsUploading(false)
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const res = await validateImageFile(file, { minWidth: 300, minHeight: 300, maxWidth: 1500, maxHeight: 1500 })
      if (!res.valid) {
        toast.error(res.reason)
        return
      } else {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        setPreviewFile(file)
      }
    }
  }

  const handleClear = () => {
    setPreviewUrl(null)
    setPreviewFile(null)
    handleChange('image', null)
    inputRef.current!.value = ''
  }

  const imageToShow = formValues.image || previewUrl

  return (
    <div className="card rounded-ss-none py-8">
      <form onSubmit={handleSubmit} className="px-6">
        <h2 className="mb-4">{productData ? 'Edit Product' : 'New Product'}</h2>
        <div className="flex flex-col xl:flex-row gap-12">
          <div className="relative flex flex-col">
            {imageToShow ? (
              <div className="group p-3 rounded-lg border border-solid border-(--border-color) self-start ">
                {formValues.image ? (
                  <ImageKitImage src={formValues.image} width={276} height={276} alt="Picture of the product" className="object-cover size-[276px]" />
                ) : (
                  <Image src={imageToShow} width={276} height={276} alt="Picture of the product" className="object-cover size-[276px]" />
                )}
                <button
                  className="btn-text bg-(--bg) absolute text-sm z-10 top-1 right-1 size-12 hidden group-hover:flex hover:bg-red-1 hover:text-white group/1"
                  type="button"
                  onClick={handleClear}
                  disabled={isUploading}
                >
                  <Trash2 className="text-red-1 group-hover/1:text-white" />
                </button>
              </div>
            ) : (
              <label htmlFor="image-upload" className={classNames({ 'mb-0 cursor-pointer': !isUploading })}>
                <input
                  ref={inputRef}
                  hidden
                  type="file"
                  id="image-upload"
                  name="image-upload"
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                  defaultValue={formValues.image || ''}
                />
                <div
                  className={classNames(
                    'flex items-center justify-center size-[300px] rounded-xl border-dashed border-2 box-border bg-orange-1 dark:bg-slate-700',
                  )}
                >
                  {!imageToShow && <ImageUp size={48} absoluteStrokeWidth className="size-60" />}
                </div>
              </label>
            )}
            <div>
              {/* TODO: Add progress UI */}
              {isUploading && !!progress && (
                <p className="relative text-sm z-10">
                  Upload progress: <progress value={progress} max={100}></progress>
                </p>
              )}
              {!!progress && <span>{progress}%</span>}
            </div>
          </div>
          <Fieldset className="flex flex-col items-stretch gap-4">
            <Field>
              <Label>Product Name</Label>
              <Input placeholder="Product Name" className="w-80" type="text" name="name" value={formValues.name} onChange={handleInputChange} />
            </Field>

            <Field>
              <Label>Price</Label>
              <Input
                placeholder="0.00 €"
                className="w-80"
                id="price"
                name="price"
                type="number"
                required
                value={formValues.price}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </Field>
            <Field className="flex-1 flex flex-col">
              <Label>Description</Label>
              <Textarea
                className="w-80 flex-1"
                id="description"
                name="description"
                placeholder="Tell us about your product"
                rows={3}
                required
                value={formValues.description}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </Field>
          </Fieldset>

          <div className="flex flex-col items-stretch w-80 gap-4">
            <Select
              options={categoryOptions.map((item) => ({ label: item.name, value: item.id }))}
              label={
                <div className="flex items-center justify-between">
                  <div>Category</div>
                  <Button className="btn-text h-7 font-normal gap-1" type="button" onClick={() => setCategoryModalOpen(true)}>
                    <BookPlus size={18} /> New
                  </Button>
                </div>
              }
              onChange={(val) => handleChange('categoryId', val)}
              value={formValues.categoryId}
            />
            <Select
              mode="multiple"
              options={productAllergens}
              label="Allergens"
              onChange={(val) => handleChange('allergens', val)}
              value={formValues.allergens}
            />
            <Select
              mode="multiple"
              options={productDietary}
              label="Dietary"
              onChange={(val) => handleChange('dietary', val)}
              value={formValues.dietary}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-10">
          <input
            type="checkbox"
            id="addCartPreferencesChecked"
            checked={formValues.addCartPreferencesChecked}
            onChange={(e) => handleChange('addCartPreferencesChecked', e.target.checked)}
            className="accent-gray-2"
          />
          <label htmlFor="addCartPreferencesChecked" className="mb-0">
            Has Preferences
          </label>
        </div>
        {formValues.addCartPreferencesChecked && (
          <div className="flex flex-col gap-4 border rounded-lg border-(--border-color) p-4 xl:p-8">
            <h2 className="mb-6">Add to Cart Preferences</h2>
            <div className="divide-y">
              {formValues.addCartPreferences.map((option: ProductPreference, index: number) => (
                <div key={index} className="flex gap-4 pb-6 mb-6 flex-wrap">
                  <Field className="w-80">
                    <Label className="">Preference Label {index + 1}</Label>
                    <Input
                      placeholder="Enter Label for Preference"
                      type="text"
                      className="w-full"
                      name={`preference-${index}`}
                      required
                      onChange={(e) => {
                        const newOptions = [...(formValues.addCartPreferences || [])]
                        newOptions[index] = { ...(newOptions[index] || {}), label: e.target.value }
                        handleChange('addCartPreferences', newOptions)
                      }}
                      value={option.label || ''}
                    />
                  </Field>
                  <Select
                    className="w-44"
                    options={[
                      { value: 'single_selection', label: 'Single' },
                      { value: 'multiple_selection', label: 'Multiple' },
                    ]}
                    label="Preference Type"
                    onChange={(val) => {
                      const newPreferences = [...formValues.addCartPreferences]
                      newPreferences[index] = { ...(newPreferences[index] || {}), type: val }
                      handleChange('addCartPreferences', newPreferences)
                    }}
                    value={option.type || ''}
                  />
                  <Field>
                    <Label>Is Required?</Label>
                    <div className="h-12">
                      <Switch
                        checked={option.isOptional}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(val) => {
                          const newPreferences = [...formValues.addCartPreferences]
                          newPreferences[index] = { ...(newPreferences[index] || {}), isOptional: val }
                          handleChange('addCartPreferences', newPreferences)
                        }}
                        className={classNames(
                          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2',
                          {
                            'bg-green-500': option.isOptional,
                            'bg-gray-400': !option.isOptional,
                          },
                        )}
                      >
                        <span className="sr-only">{option.isOptional ? 'Active' : 'Inactive'}</span>
                        <span
                          className={classNames('inline-block h-4 w-4 transform rounded-3xl bg-white transition-transform', {
                            'translate-x-3': option.isOptional,
                            '-translate-x-3': !option.isOptional,
                          })}
                        />
                      </Switch>
                    </div>
                  </Field>

                  <Field className="flex-1">
                    <div className="w-full flex items-center gap-2 mb-2 min-w-96">
                      <Field className="flex-1">
                        <Label>Option</Label>
                        <Input
                          className="w-full"
                          placeholder="Enter Option"
                          maxLength={40}
                          value={option.optionLabelInput || ''}
                          onChange={(e) => {
                            const newOptions = [...(formValues.addCartPreferences || [])]
                            newOptions[index] = { ...(newOptions[index] || {}), optionLabelInput: e.target.value }
                            handleChange('addCartPreferences', newOptions)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              if (option.value?.find((opt) => opt.label === option.optionLabelInput)) {
                                toast.error('Option already exists')
                                return
                              } else if (!option.optionLabelInput) {
                                toast.error('Please enter an option')
                                return
                              }
                              const newOptions = [...(formValues.addCartPreferences || [])]
                              newOptions[index] = {
                                ...(newOptions[index] || {}),
                                value: (option.value || []).concat([{ label: option.optionLabelInput, price: option.optionPriceInput }]),
                                inputValue: '',
                              }
                              handleChange('addCartPreferences', newOptions)
                            }
                          }}
                        />
                      </Field>
                      <Field className="flex-1">
                        <Label>Price</Label>
                        <Input
                          className="w-full"
                          placeholder="0.00 €"
                          id="price"
                          name="price"
                          type="number"
                          value={option.optionPriceInput || ''}
                          onChange={(e) => {
                            if (!/^(\d+(\.\d{0,2})?)?$/.test(e.target.value)) return
                            const newOptions = [...(formValues.addCartPreferences || [])]
                            newOptions[index] = { ...(newOptions[index] || {}), optionPriceInput: e.target.value }
                            handleChange('addCartPreferences', newOptions)
                          }}
                          autoComplete="off"
                        />
                      </Field>
                      <Button
                        className="self-end"
                        title="Add Option"
                        onClick={() => {
                          if (option.value?.find((opt) => opt.label === option.optionLabelInput)) {
                            toast.error('Option already exists')
                            return
                          } else if (!option.optionLabelInput) {
                            toast.error('Please enter an option')
                            return
                          }
                          const newOptions = [...(formValues.addCartPreferences || [])]
                          newOptions[index] = {
                            ...(newOptions[index] || {}),
                            value: (option.value || []).concat([{ label: option.optionLabelInput, price: option.optionPriceInput }]),
                            optionLabelInput: '',
                            optionPriceInput: '',
                          }
                          handleChange('addCartPreferences', newOptions)
                        }}
                      >
                        <ArrowRight />
                      </Button>
                    </div>
                    <Label className="">Preference Options</Label>
                    {!!option.value?.length && (
                      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-solid border-(--border-color) p-2 mb-2">
                        {option.value?.map((v) => (
                          <div key={v.label} className="flex items-center gap-2 bg-(--bg-secondary) rounded-lg px-2 py-1">
                            {v.label}{' '}
                            {!!v.price && (
                              <>
                                : <span className="border rounded-lg px-2 leading-5">{v.price} €</span>
                              </>
                            )}
                            <Button
                              className="h-6 p-1"
                              onClick={() => {
                                const newOptions = [...(formValues.addCartPreferences || [])]
                                newOptions[index] = {
                                  ...(newOptions[index] || {}),
                                  value: newOptions[index].value.filter((_: any) => _ !== v),
                                }
                                handleChange('addCartPreferences', newOptions)
                              }}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </Field>
                  <Button
                    type="button"
                    className="mt-7 btn-text bg-(--bg) text-sm z-10 size-12 text-red-1 hover:bg-red-1 hover:text-white"
                    onClick={() => {
                      const newOptions = formValues.addCartPreferences.filter((_: any, i: any) => i !== index)
                      handleChange('addCartPreferences', newOptions)
                    }}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              className="btn-default w-80"
              onClick={() => {
                handleChange('addCartPreferences', [...(formValues.addCartPreferences || []), { type: 'single_selection' }])
              }}
            >
              <ArrowBigDownDash className="mr-2" size={16} /> Add New Field
            </Button>
          </div>
        )}

        <Button type="submit" className="my-8 mx-auto w-80">
          {productData ? 'Save' : 'Create'}
        </Button>
      </form>

      <Modal
        title={
          <div className="flex items-center gap-1 justify-center">
            <BookPlus size={20} /> Create Category
          </div>
        }
        open={categoryModalOpen}
        setOpen={setCategoryModalOpen}
        okText="Save"
        okClick={() => {
          createCategoryAction({ name: categoryModalInput }).then((res) => {
            if (res.error) {
              toast.error(res.error)
            } else if (res.message) {
              toast.success(res.message)
              setCategoryModalOpen(false)
              router.refresh()
              handleChange('categoryId', res.data.id)
            }
          })
        }}
        content={
          <form className="p-8">
            <Field>
              <Label>Category Name</Label>
              <Input
                placeholder="Drinks"
                className="w-full"
                type="text"
                name="name"
                required
                value={categoryModalInput}
                onChange={(e) => setCategoryModalInput(e.target.value)}
                autoComplete="off"
              />
            </Field>
          </form>
        }
      />
    </div>
  )
}
