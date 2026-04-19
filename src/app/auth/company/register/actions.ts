'use server'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '@/constants'
import { db } from '@/lib/database/db'
import { account } from '@/lib/database/schema/account'
import { company } from '@/lib/database/schema/company'
import { getLatLon } from '@/lib/utils/getLatLon'

export const registerCompanyAction = async (_prevState: any, formData: FormData) => {
  const privacyPolicy = formData.get('privacyPolicy')?.toString() || ''
  const postcode = formData.get('postcode')?.toString() || ''
  const city = formData.get('city')?.toString() || ''
  const street = formData.get('street')?.toString() || ''
  const houseNumber = formData.get('houseNumber')?.toString() || ''
  const houseNumberAddition = formData.get('houseNumberAddition')?.toString() || ''
  const cocId = formData.get('cocId')?.toString() || ''
  const password = formData.get('password')?.toString() || ''
  const passwordConfirm = formData.get('passwordConfirm')?.toString() || ''
  const token = formData.get('token')?.toString() || ''

  const values = {
    privacyPolicy,
    postcode,
    city,
    street,
    houseNumber,
    houseNumberAddition,
    cocId,
  }

  let decodedToken: any

  if (!privacyPolicy) {
    return {
      error: 'You must accept the privacy policy to register.',
      values,
    }
  }

  try {
    decodedToken = jwt.verify(token, JWT_SECRET)
  } catch (_) {
    return {
      title: 'Your token is expired!',
      error: 'Your token is expired. Please start the registration process again.',
      values,
    }
  }

  const [foundAccount] = await db.select().from(account).where(eq(account.email, decodedToken.email))
  if (!foundAccount) {
    return {
      title: 'This company is not started yet!',
      error: 'Your company is not started yet. Please start the registration process again.',
      values,
    }
  }
  if (foundAccount.emailVerified) {
    return {
      title: 'Company is already registered!',
      error: 'This email is already used. If you forgot your password, use forgot password flow.',
      values,
    }
  }

  if (password !== passwordConfirm) {
    return {
      error: 'Passwords do not match!',
      values,
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const { lat, lon } = await getLatLon({ postalcode: postcode, city, street })

    await db.update(account).set({ password: hashedPassword, emailVerified: true }).where(eq(account.email, decodedToken.email))

    await db
      .update(company)
      .set({
        ...values,
        lat,
        lon,
      })
      .where(eq(company.accountId, foundAccount.id))
  } catch (e: any) {
    return {
      error: e?.detail || 'Error registering company. Please try again later.',
      values,
    }
  }

  return { message: 'Company is registered successfully. Now you can login and start your service.' }
}
