'use server'

import { and, eq } from 'drizzle-orm'

import { db } from '@/lib/database/db'
import { product } from '@/lib/database/schema'
import { auth } from '@/lib/utils/auth'

export const createProductAction = async (formValues: any) => {
  const session = await auth()

  const newProduct = formValues

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

export const getProductDataAction = async (productId: number) => {
  const session = await auth()

  const productData = session?.user?.id
    ? await db.query.product.findFirst({
        where: and(eq(product.companyId, session?.user?.id), eq(product.id, productId)),
      })
    : null

  return productData
}

export const editProductAction = async (formValues: any, productId: number) => {
  const session = await auth()

  const newProduct = formValues

  await db
    .update(product)
    .set({
      companyId: session?.user?.id,
      ...newProduct,
    })
    .where(eq(product.id, productId))

  return { message: 'Product is updated successfully.' }
}
