'use server'

import { and, eq } from 'drizzle-orm'

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

export const getProductsAction = async () => {
  const session = await auth()

  const products = session?.user?.id ? await db.select().from(product).where(eq(product.companyId, session?.user?.id)) : []

  return products
}

export const updateProductActivationAction = async (productId: number, isActive: boolean) => {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        error: true,
        message: 'Authentication required',
      }
    }

    // Verify product ownership
    const productExists = await db
      .select()
      .from(product)
      .where(and(eq(product.id, productId), eq(product.companyId, session.user.id)))
      .then((results) => results.length > 0)

    if (!productExists) {
      return {
        error: true,
        message: "Product not found or you don't have permission to update it",
      }
    }

    // Update product active status
    await db.update(product).set({ active: isActive }).where(eq(product.id, productId))

    return {
      message: `Product has been ${isActive ? 'activated' : 'deactivated'} successfully`,
    }
  } catch (error: any) {
    console.error('Error updating product activation status:', error)
    return {
      error: true,
      message: error.message || 'Failed to update product status',
    }
  }
}
