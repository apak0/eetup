'use client'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import {
  Image as ImageKitImage,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from '@imagekit/next'
import classNames from 'classnames'
import { ImageUp, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { createProductAction } from './actions'

import Select from '@/components/reusables/Select'
import { productAllergens, productCategories, productDietary } from '@/lib/database/constants'
import { validateImageFile } from '@/lib/utils/validateImageSize'

export const CreateProduct = () => {
  const router = useRouter()

  const session = useSession()

  const inputRef = useRef<HTMLInputElement>(null)
  const [progress, setProgress] = useState(0)
  const [categories, setCategories] = useState()
  const [allergens, setAllergens] = useState()
  const [dietary, setDietary] = useState()
  const [isUploading, setIsUploading] = useState(false)
  const [previewFile, setPreviewFile] = useState<any>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [finalUrl, setFinalUrl] = useState<string | null>(null)

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

    const formData = new FormData(event.currentTarget)

    formData.append('categories', JSON.stringify(categories))
    formData.append('allergens', JSON.stringify(allergens))
    formData.append('dietary', JSON.stringify(dietary))
    const productName = formData.get('name')?.toString() || ''

    if (!previewUrl) {
      toast.error('Please select an image for the product')
      return
    }

    setIsUploading(true)
    try {
      const { signature, expire, token, publicKey } = await imageKitAuthenticator()

      const uploadResponse = finalUrl
        ? { url: finalUrl }
        : await upload({
            expire,
            token,
            signature,
            publicKey,
            file: previewFile,
            fileName: productName?.replaceAll(' ', '_'),
            folder: `products/${session?.data?.user?.organization?.replaceAll(' ', '_')}/`,
            onProgress,
          })

      if (uploadResponse?.url) {
        setFinalUrl(uploadResponse?.url)
        formData.append('image', uploadResponse?.url)
        await createProductAction(formData)
      } else {
        throw new Error('Image upload failed. Please try with another image.')
      }

      toast.success('Product created successfully!')
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
    setFinalUrl(null)
    setPreviewFile(null)
    inputRef.current!.value = ''
  }

  const imageToShow = finalUrl || previewUrl

  return (
    <div className="card rounded-ss-none py-8">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-8 px-6">
          <div className="flex flex-col items-stretch w-80 gap-4">
            <h2>New Product</h2>
            <input type="text" name="name" id="name" placeholder="Product Name" required autoComplete="off" />
            <input type="text" name="description" id="description" placeholder="Description" required autoComplete="off" />
            <input type="number" name="price" id="price" placeholder="Price" required autoComplete="off" />
            <Select mode="multiple" options={productCategories} label="Categories" onChange={setCategories} />
            <Select mode="multiple" options={productAllergens} label="Allergens" onChange={setAllergens} />
            <Select mode="multiple" options={productDietary} label="Dietary" onChange={setDietary} />

            <button type="submit" className="my-8 w-full">
              Create Product
            </button>
          </div>
          <div className="relative mx-auto my-12 flex flex-col">
            <input ref={inputRef} hidden type="file" id="image-upload" name="image-upload" accept="image/*" required onChange={handleFileChange} />
            {imageToShow ? (
              <div className="group p-3 rounded-lg border border-solid border-(--border-color) self-start">
                {finalUrl ? (
                  <ImageKitImage src={finalUrl} width={400} height={400} alt="Picture of the product" />
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
      </form>
    </div>
  )
}
