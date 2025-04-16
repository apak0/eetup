'use server'

import { db } from '@/lib/database/db'
import { product } from '@/lib/database/schema'
import { authenticateRequest } from '@/lib/utils/authenticate'

export const createProductAction = async (formData: any) => {
  const company = await authenticateRequest()

  console.log('ahoy1', company, formData)
  const name = formData.get('name')?.toString() || ''
  const description = formData.get('description')?.toString() || ''
  const price = parseFloat(formData.get('price')?.toString() || '0') as any
  const image = formData.get('image')?.toString() || ''
  const categories = formData.get('categories')?.toString() || ''
  const allergens = formData.get('allergens')?.toString() || ''
  const dietary = formData.get('dietary')?.toString() || ''

  const newProduct = {
    name,
    description,
    price,
    image,
    categories: categories.split(','),
    allergens: allergens.split(','),
    dietary: dietary.split(','),
  }

  db.insert(product).values({
    companyId: company.id,
    ...newProduct,
  })

  return { message: 'Product is added to your menu successfully. You can deactivate the product at any time.' }
}
