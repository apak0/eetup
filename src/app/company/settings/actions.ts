'use server'

import { and, eq, isNull, or } from 'drizzle-orm'

import { db } from '@/lib/database/db'
import { tag } from '@/lib/database/schema'
import { auth } from '@/lib/utils/auth'

export const getCompanyTagOptions = async () => {
  const session = await auth()
  const companyId = session?.user?.id

  return companyId
    ? await db.query.tag.findMany({
        where: or(eq(tag.companyId, companyId), isNull(tag.companyId)),
      })
    : []
}

export const createTagAction = async (formValues: any) => {
  const session = await auth()
  if (!session?.user?.id || !session?.user?.isCompany) return { error: 'Unauthorized' }
  const companyId = session?.user?.id

  const newTag = formValues
  if (!newTag.name?.length || newTag.name.length < 2) {
    return {
      error: 'Tag name is required. It should be at least 2 characters long.',
    }
  }

  const existingTag = await db
    .select()
    .from(tag)
    .where(and(isNull(tag.companyId), eq(tag.name, newTag.name)))
    .then((results) => results.length > 0)

  if (existingTag) {
    return {
      error: 'Tag already exists. Choose a different name or use the existing.',
    }
  }

  const insertedVal = (
    await db
      .insert(tag)
      .values({
        companyId,
        ...newTag,
      })
      .returning()
  )[0]

  return { message: 'Tag is added to your menu successfully.', data: insertedVal }
}
