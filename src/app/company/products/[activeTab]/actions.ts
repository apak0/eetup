'use server'

import { and, eq, isNull, or } from 'drizzle-orm'

import { db } from '@/lib/database/db'
import { category, product } from '@/lib/database/schema'
import { CompanyWithConnections } from '@/lib/database/type'
import { auth } from '@/lib/utils/auth'

export const createProductAction = async (formValues: any) => {
  const session = await auth()
  if (!session?.user?.id || !session?.user?.isCompany) return { error: 'Unauthorized' }
  const companyId = session?.user?.id

  const newProduct = formValues

  await db.insert(product).values({
    companyId,
    ...newProduct,
  })

  return { message: 'Product is added to your menu successfully. You can deactivate the product at any time.' }
}

export const editProductAction = async (formValues: any, productId: number) => {
  const session = await auth()
  if (!session?.user?.id || !session?.user?.isCompany) return { error: 'Unauthorized' }

  const companyId = session?.user?.id
  const newProduct = formValues

  await db
    .update(product)
    .set({
      companyId,
      ...newProduct,
    })
    .where(eq(product.id, productId))

  return { message: 'Product is updated successfully.' }
}

export const getProductsAction = async () => {
  const session = await auth()

  const products = session?.user?.id ? await db.select().from(product).where(eq(product.companyId, session?.user?.id)) : []

  return products
}

export const getLoggedInCompanyWithConnectionsAction = async (): Promise<{ error?: any; data?: CompanyWithConnections }> => {
  const session = await auth()

  if (!session?.user?.id || !session?.user?.isCompany) return { error: 'Unauthorized' }

  const companyId = session?.user?.id

  const companyWithConnections = await db.query.company.findFirst({
    where: (company, { eq }) => eq(company.id, companyId),
    columns: {
      password: false,
    },
    with: {
      product: true,
      category: {
        with: {
          product: {
            orderBy: (product, { desc }) => desc(product.price),
          },
        },
      },
    },
  })

  const globalCategoriesWithProducts = await db.query.category.findMany({
    where: (category, { isNull }) => isNull(category.companyId),
    with: {
      product: {
        where: (product, { eq }) => eq(product.companyId, companyId),
      },
    },
  })
  companyWithConnections?.category?.push(...globalCategoriesWithProducts)

  if (!companyWithConnections) return { error: 'Company not found' }

  return { data: companyWithConnections }
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
  const companyId = session?.user?.id

  return companyId
    ? await db.query.product.findFirst({
        where: and(eq(product.companyId, companyId), eq(product.id, productId)),
      })
    : null
}

export const getCompanyCategoryOptions = async () => {
  const session = await auth()
  const companyId = session?.user?.id

  return companyId
    ? await db.query.category.findMany({
        where: or(eq(category.companyId, companyId), isNull(category.companyId)),
      })
    : []
}

export const createCategoryAction = async (formValues: any) => {
  const session = await auth()
  if (!session?.user?.id || !session?.user?.isCompany) return { error: 'Unauthorized' }
  const companyId = session?.user?.id

  const newCategory = formValues
  if (!newCategory.name?.length || newCategory.name.length < 2) {
    return {
      error: 'Category name is required. It should be at least 2 characters long.',
    }
  }

  const existingCategory = await db
    .select()
    .from(category)
    .where(and(isNull(category.companyId), eq(category.name, newCategory.name)))
    .then((results) => results.length > 0)

  if (existingCategory) {
    return {
      error: 'Category already exists. Choose a different name or use the existing.',
    }
  }

  const insertedVal = (
    await db
      .insert(category)
      .values({
        companyId,
        ...newCategory,
      })
      .returning()
  )[0]

  return { message: 'Category is added to your menu successfully.', data: insertedVal }
}
