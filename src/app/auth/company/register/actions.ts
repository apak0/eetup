'use server'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '@/constants'
import { db } from '@/lib/database/db'
import { company } from '@/lib/database/schema'

export const registerCompanyAction = async (_prevState: any, formData: FormData) => {
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
    postcode,
    city,
    street,
    houseNumber,
    houseNumberAddition,
    cocId,
  }

  let decodedToken: any = null

  try {
    decodedToken = jwt.verify(token, JWT_SECRET)
  } catch (_) {
    return {
      error: true,
      title: 'Your token is expired!',
      message: 'Your token is expired. Please start the registration process again.',
      values,
    }
  }

  const [foundCompany] = await db.select().from(company).where(eq(company.email, decodedToken.email))

  if (!foundCompany) {
    return {
      error: true,
      title: 'This company is not stared yet!',
      message: 'Your company is not started yet. Please start the registration process again.',
      values,
    }
  }

  if (foundCompany.emailVerified) {
    return {
      error: true,
      title: 'Company is already registered!',
      message: 'This email is already used. If you forgot your password, use forgot password flow.',
      values,
    }
  }

  if (password !== passwordConfirm) {
    return {
      error: true,
      message: 'Passwords do not match!',
      values,
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await db
      .update(company)
      .set({
        ...values,
        password: hashedPassword,
        emailVerified: true,
      })
      .where(eq(company.email, decodedToken.email))
  } catch (e: any) {
    return {
      error: true,
      message: e?.detail || 'Error registering company. Please try again later.',
      values,
    }
  }

  return { message: 'Company is registered successfully. Now you can login and start your service.' }
}
