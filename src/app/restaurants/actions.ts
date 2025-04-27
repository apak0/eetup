import { db } from '@/lib/database/db'
import { product } from '@/lib/database/schema'
import { auth } from '@/lib/utils/auth'

export const getProductsAction = async () => {
  const session = await auth()

  const products = session?.user?.id ? await db.select().from(product) : []

  return products
}
