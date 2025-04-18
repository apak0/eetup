'use server'

import { db } from '@/lib/database/db'
import { product } from '@/lib/database/schema'
import { auth } from '@/lib/utils/auth'

export const createProductAction = async (formData: any) => {
  const session: any = await auth()

  const name = formData.get('name')?.toString() || ''
  const description = formData.get('description')?.toString() || ''
  const price = parseFloat(formData.get('price')?.toString() || '0') as any
  const image = formData.get('image')?.toString() || ''
  const categories = JSON.parse(formData.get('categories'))
  const allergens = JSON.parse(formData.get('allergens'))
  const dietary = JSON.parse(formData.get('dietary'))

  const newProduct = {
    name,
    description,
    price,
    image,
    categories: categories,
    allergens: allergens,
    dietary: dietary,
  }

  await db.insert(product).values({
    companyId: session?.user?.id,
    ...newProduct,
  })

  return { message: 'Product is added to your menu successfully. You can deactivate the product at any time.' }
}
