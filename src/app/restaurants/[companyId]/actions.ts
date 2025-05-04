import { db } from '@/lib/database/db'
import { auth } from '@/lib/utils/auth'

export const getProductsAction = async (companyId: number): Promise<{ error?: any; data?: any }> => {
  const session = await auth()

  if (!session?.user?.id) return { error: 'Unauthorized' }

  const companyWithProducts = await db.query.company.findFirst({
    where: (company, { eq }) => eq(company.id, companyId),
    with: {
      product: true,
    },
  })

  if (!companyWithProducts) return { error: 'Company not found' }

  return { data: companyWithProducts }
}
