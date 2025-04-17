import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import classNames from 'classnames'
import { ImageUp, Trash2 } from 'lucide-react'
import Image from 'next/image'

import { createProductAction, uploadImageKit } from './actions'
import { productAllergens, productCategories, productDietary } from './constants'

import Select from '@/components/reusables/Select'
import { validateImageFile } from '@/lib/utils/validateImageSize'

export const CreateProduct = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [categories, setCategories] = useState([])
  const [allergens, setAllergens] = useState([])
  const [dietary, setDietary] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [finalUrl, setFinalUrl] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    formData.append('categories', JSON.stringify(categories))
    formData.append('allergens', JSON.stringify(allergens))
    formData.append('dietary', JSON.stringify(dietary))
 
    setIsUploading(true)
    const imageUrl = await uploadImageKit(formData)
    if (imageUrl) {
      formData.append('image', imageUrl)

      await createProductAction(formData)
      setIsUploading(false)
    } else {
      toast.error('Image upload failed. Please try again.')
    }
    setIsUploading(false)
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
      }
    }
  }

  const handleClear = () => {
    setPreviewUrl(null)
    setFinalUrl(null)
    inputRef.current!.value = '' // Reset input
  }

  const imageToShow = finalUrl || previewUrl

  return (
    <div className=" py-8">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-8 px-4">
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
          <div className="relative mx-auto my-12 flex">
            <input ref={inputRef} hidden type="file" id="image" name="image" accept="image/*" required onChange={handleFileChange} />
            {imageToShow ? (
              <div className="group p-3 rounded-lg border border-solid border-(--border-color) self-start">
                <Image width={400} height={400} src={imageToShow} alt="Uploaded" className="object-contain" />
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
              <div
                className={classNames(
                  'flex items-center justify-center size-[300px] rounded-xl outline-dashed outline-2 bg-orange-1 dark:bg-gray-800',
                  {
                    'opacity-80': isUploading,
                    'cursor-pointer': !isUploading,
                  },
                )}
              >
                <label htmlFor="image">{!imageToShow && <ImageUp size={48} absoluteStrokeWidth className="size-60" />}</label>
                {isUploading && <p className="relative text-sm z-10">Uploading...</p>}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
