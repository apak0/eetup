import { db } from '@/lib/database/db'
import { CompanyWithConnections } from '@/lib/database/type'
import { auth } from '@/lib/utils/auth'

export const getCompanyWithProductsAction = async (companyId: number): Promise<{ error?: any; data?: CompanyWithConnections }> => {
  const session = await auth()

  if (!session?.user?.id) return { error: 'Unauthorized' }

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
