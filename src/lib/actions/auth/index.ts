import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import nodemailer from 'nodemailer'

import { db } from '../../database/db'
import { company } from '../../database/schema'

import { registerCompanyEmailTemplate } from './mail-templates/register-company'

import { appName, JWT_SECRET } from '@/constants'

export const startCompanyRegister = async (formData: FormData) => {
  const email = formData.get('email')?.toString() || ''
  const firstName = formData.get('firstName')?.toString() || ''
  const lastName = formData.get('lastName')?.toString() || ''
  const organization = formData.get('organization')?.toString() || ''
  const tel = formData.get('tel')?.toString() || ''

  const [foundCompany] = await db.select().from(company).where(eq(company.email, email))

  if (foundCompany?.password) {
    return {
      error: true,
      title: 'Company already exists!',
      message: 'Your company already exists. If you forgot your passwor, use forgot password to reset your password.',
    }
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const registrationToken = jwt.sign({ email, firstName, lastName, organization }, JWT_SECRET)

  const mailTemplate = registerCompanyEmailTemplate({ firstName, registrationToken })

  // Email options
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Company Invitation to ${appName}`,
    text: `Register your store at ${appName} below`,
    html: mailTemplate,
  }

  // Send the email
  transporter.sendMail(mailOptions, async (error) => {
    if (error) {
      return console.error('Error sending email:', error)
    }

    const newCompany = { email, firstName, lastName, organization, tel }

    await db.insert(company).values(newCompany)
  })

  return { message: 'Company registration email sent succesfully! Check your email.' }
}

export const registerCompany = async (formData: FormData) => {
  const postcode = formData.get('postcode')?.toString() || ''
  const city = formData.get('city')?.toString() || ''
  const street = formData.get('street')?.toString() || ''
  const houseNumber = formData.get('houseNumber')?.toString() || ''
  const houseNumberAddition = formData.get('houseNumberAddition')?.toString() || ''
  const cocId = formData.get('cocId')?.toString() || ''
  const password = formData.get('cocId')?.toString() || ''
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

  db.update(company)
    .set({ password, cocId, postcode, city, street, houseNumber, houseNumberAddition })
    .where(eq(company.email, decodedToken.email))

  return { message: 'Company registration email sent succesfully! Check your email.' }
}

export const updateCompany = async (formData: FormData) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  console.log('ahoy1', token)

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
