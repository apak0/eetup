'use client'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Button, Input } from '@headlessui/react'
import {
  Image as ImageKitImage,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from '@imagekit/next'
import classNames from 'classnames'
import { ArrowBigDownDash, ArrowRight, ImageUp, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { createProductAction, editProductAction } from './actions'

import { FloatingInput } from '@/components/reusables/FloatingInput'
import FloatingTextarea from '@/components/reusables/FloatingTextarea'
import Select from '@/components/reusables/Select'
import { productAllergens, productCategories, productDietary } from '@/lib/database/constants'
import { Product } from '@/lib/database/type'
import { validateImageFile } from '@/lib/utils/validateImageSize'

type ProductOption = {
  label: string
  value: string[]
  inputValue: string
  type: 'single selection' | 'multiple selection'
}

export const CreateEditProduct = ({ productData }: { productData?: Product }) => {
  const isEdit = !!productData
  const router = useRouter()
  const session = useSession()

  const inputRef = useRef<HTMLInputElement>(null)
  const [progress, setProgress] = useState(0)

  const [isUploading, setIsUploading] = useState(false)
  const [previewFile, setPreviewFile] = useState<any>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(productData?.image || null)
  const [formValues, setFormValues] = useState({
    name: productData?.name || '',
    description: productData?.description || '',
    price: productData?.price || '',
    image: productData?.image || null,
    categories: productData?.categories || [],
    allergens: productData?.allergens || [],
    dietary: productData?.dietary || [],
    addCartPreferencesChecked: productData?.addCartPreferencesChecked || false,
    addCartPreferences: productData?.addCartPreferences || [{ type: 'single_selection' }],
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

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
      <form onSubmit={handleSubmit}>
        <div className="flex gap-8 px-6">
          <div className="flex flex-col items-stretch w-80 gap-4">
            <h2>{productData ? 'Edit Product' : 'New Product'}</h2>
            <FloatingInput type="text" name="name" label="Product Name" required onChange={handleInputChange} value={formValues.name} />

            <FloatingTextarea
              rows={3}
              className="h-22"
              name="description"
              id="description"
              placeholder="Description"
              required
              autoComplete="off"
              onChange={handleInputChange}
              value={formValues.description}
            />

            <FloatingInput type="number" name="price" label="Price" required onChange={handleInputChange} value={formValues.price} />

            <Select
              mode="multiple"
              options={productCategories}
              label="Categories"
              onChange={(val) => handleChange('categories', val)}
              value={formValues.categories}
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
          <div className="relative mx-auto py-12 flex flex-col">
            {imageToShow ? (
              <div className="group p-3 rounded-lg border border-solid border-(--border-color) self-start">
                {formValues.image ? (
                  <ImageKitImage src={formValues.image} width={400} height={400} alt="Picture of the product" />
                ) : (
                  <Image src={imageToShow} width={400} height={400} alt="Picture of the product" />
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
              <label htmlFor="image-upload" className={classNames({ 'cursor-pointer': !isUploading })}>
                <input
                  ref={inputRef}
                  hidden
                  type="file"
                  id="image-upload"
                  name="image-upload"
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                  defaultValue={formValues.image}
                />
                <div
                  className={classNames(
                    'flex items-center justify-center size-[300px] rounded-xl outline-dashed outline-2 bg-orange-1 dark:bg-slate-700',
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
        </div>
        <div className="flex items-center gap-2 px-6">
          <input
            type="checkbox"
            id="addCartPreferencesChecked"
            checked={formValues.addCartPreferencesChecked}
            onChange={(e) => handleChange('addCartPreferencesChecked', e.target.checked)}
            className="accent-gray-2"
          />
          <label htmlFor="addCartPreferencesChecked">Add to Cart Preferences</label>
        </div>
        {formValues.addCartPreferencesChecked && (
          <div className="flex flex-col gap-4 px-6">
            <h2>Add to Cart Preferences</h2>
            {formValues.addCartPreferences.map((option: ProductOption, index: number) => (
              <div key={index} className="flex gap-4 items-end">
                <div>
                  <FloatingInput
                    type="text"
                    name={`preference-${index}`}
                    label={`Preference ${index + 1}`}
                    required
                    onChange={(e) => {
                      const newOptions = [...formValues.addCartPreferences]
                      newOptions[index] = { ...(newOptions[index] || {}), label: e.target.value }
                      handleChange('addCartPreferences', newOptions)
                    }}
                    value={option.label || ''}
                  />
                </div>
                <Select
                  className="w-70"
                  options={[
                    { value: 'single_selection', label: 'Single' },
                    { value: 'multiple_selection', label: 'Multiple' },
                  ]}
                  label="Selection Type"
                  onChange={(val) => {
                    const newPreferences = [...formValues.addCartPreferences]
                    newPreferences[index] = { ...(newPreferences[index] || {}), type: val.value }
                    handleChange('addCartPreferences', newPreferences)
                  }}
                  value={option.type || ''}
                />
                <div className="max-w-1/2 w-1/2">
                  <span className="text-sm text-gray-5">Preference Options</span>
                  {!!option.value?.length && (
                    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-solid border-(--border-color) p-2 mb-2">
                      {option.value?.map((v) => (
                        <div key={v} className="flex items-center gap-2 bg-(--bg-secondary) rounded-lg px-2 py-1">
                          {v}
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
                  <div className="w-full flex items-center gap-2">
                    <Input
                      className="flex-1"
                      placeholder="Option Text"
                      maxLength={40}
                      onChange={(e) => {
                        const newOptions = [...(formValues.addCartPreferences || [])]
                        newOptions[index] = { ...(newOptions[index] || {}), inputValue: e.target.value }
                        handleChange('addCartPreferences', newOptions)
                      }}
                    />
                    <Button
                      onClick={() => {
                        if (option.value?.includes(option.inputValue)) {
                          toast.error('Option already exists')
                          return
                        } else if (!option.inputValue) {
                          toast.error('Please enter an option')
                          return
                        }
                        const newOptions = [...(formValues.addCartPreferences || [])]
                        newOptions[index] = { ...(newOptions[index] || {}), value: (option.value || []).concat([option.inputValue]) }
                        console.log('ahoy000', newOptions)
                        handleChange('addCartPreferences', newOptions)
                      }}
                    >
                      <ArrowRight />
                    </Button>
                  </div>
                </div>
                <Button
                  type="button"
                  className="btn-text bg-(--bg) text-sm z-10 size-12 text-red-1 hover:bg-red-1 hover:text-white"
                  onClick={() => {
                    const newOptions = formValues.addCartPreferences.filter((_: any, i: any) => i !== index)
                    handleChange('addCartPreferences', newOptions)
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              className="btn-default"
              onClick={() => {
                handleChange('addCartPreferences', [...(formValues.addCartPreferences || []), { type: 'single_selection' }])
              }}
            >
              <ArrowBigDownDash className="mr-2" size={16} /> Add New Field
            </Button>
          </div>
        )}

        <button type="submit" className="my-8 w-full">
          {productData ? 'Save' : 'Create'}
        </button>
      </form>
    </div>
  )
}
