'use server'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

import { JWT_SECRET } from '@/constants'
import { db } from '@/lib/database/db'
import { company } from '@/lib/database/schema'

export const registerCompany = async (formData: FormData) => {
  const postcode = formData.get('postcode')?.toString() || ''
  const city = formData.get('city')?.toString() || ''
  const street = formData.get('street')?.toString() || ''
  const houseNumber = formData.get('houseNumber')?.toString() || ''
  const houseNumberAddition = formData.get('houseNumberAddition')?.toString() || ''
  const cocId = formData.get('cocId')?.toString() || ''
  const password = formData.get('password')?.toString() || ''
  const passwordConfirm = formData.get('passwordConfirm')?.toString() || ''
  const token = formData.get('token')?.toString() || ''

  let decodedToken: any = null

  try {
    decodedToken = jwt.verify(token, JWT_SECRET)
  } catch (_) {
    return {
      error: true,
      title: 'Your token is expired!',
      message: 'Your token is expired. Please start the registration process again.',
    }
  }

  const [foundCompany] = await db.select().from(company).where(eq(company.email, decodedToken.email))

  if (!foundCompany) {
    return {
      error: true,
      title: 'This company is not stared yet!',
      message: 'Your company is not started yet. Please start the registration process again.',
    }
  }

  if (foundCompany.active) {
    return {
      error: true,
      title: 'Company is already registered!',
      message: 'If you forgot your password, use the forgot password link to reset your password.',
    }
  }

  if (password !== passwordConfirm) {
    return {
      error: true,
      message: 'Passwords do not match!',
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db
    .update(company)
    .set({
      password: hashedPassword,
      cocId,
      postcode,
      city,
      street,
      houseNumber,
      houseNumberAddition,
      emailVerified: true,
    })
    .where(eq(company.email, decodedToken.email))

  return { message: 'Company is registered successfully. Now you can login and start your service.' }
}

export const updateCompany = async (formData: FormData) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  const tel = formData.get('tel')?.toString() || ''
  const bannedPostcodes = (formData.get('bannedPostcodes') as unknown as string[]) || []

  let decodedToken: any = null

  try {
    decodedToken = token && jwt.verify(token, JWT_SECRET)
  } catch (_) {
    return {
      error: true,
      title: 'Your token is expired!',
      message: 'Your token is expired. Please start the registration process again.',
    }
  }

  const [foundCompany] = await db.select().from(company).where(eq(company.email, decodedToken?.email))

  if (!foundCompany) {
    return {
      error: true,
      title: 'This company is not stared yet!',
      message: 'Your company is not started yet. Please start the registration process again.',
    }
  }

  if (!foundCompany?.active) {
    return {
      error: true,
      title: 'Not Allowed to Update!',
      message: 'You are not allowed to update your company information. Please wait untill the company is activated',
    }
  }

  db.update(company).set({ tel, bannedPostcodes }).where(eq(company.email, decodedToken.email))

  return { message: 'Company registration email sent succesfully! Check your email.' }
}
