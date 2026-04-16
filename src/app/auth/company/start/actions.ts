'use server'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

import { appName, JWT_SECRET } from '@/constants'
import { db } from '@/lib/database/db'
import { account } from '@/lib/database/schema/account'
import { company } from '@/lib/database/schema/company'
import { sendEmail } from '@/lib/utils/sendEmail'
import { registerCompanyEmailTemplate } from '@/lib/templates/registerCompany'

export const startCompanyAction = async (_prevState: any, formData: FormData) => {
  const privacyPolicy = formData.get('privacyPolicy')?.toString() || ''
  const email = formData.get('email')?.toString() || ''
  const firstName = formData.get('firstName')?.toString() || ''
  const lastName = formData.get('lastName')?.toString() || ''
  const organization = formData.get('organization')?.toString() || ''
  const tel = formData.get('tel')?.toString() || ''

  const values = {
    privacyPolicy,
    email,
    firstName,
    lastName,
    organization,
    tel,
  }

  if (!privacyPolicy) {
    return {
      error: 'You must accept the privacy policy to start.',
      values,
    }
  }

  // Check for existing account
  const [foundAccount] = await db.select().from(account).where(eq(account.email, email))
  if (foundAccount) {
    return {
      error: 'This email is already used. If you forgot your password, use forgot password flow.',
      title: 'Company already exists!',
      values,
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

  const registrationToken = jwt.sign({ email, firstName, lastName, organization }, JWT_SECRET, { expiresIn: '1h' })

  const mailTemplate = registerCompanyEmailTemplate({ firstName, registrationToken })

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Company Invitation to ${appName}`,
    html: mailTemplate,
  }

  const res = await sendEmail(mailOptions)

  if (res.rejected.length > 0) {
    return {
      error: 'Error sending email. Please try again later.',
      values,
    }
  }

  try {
    const [createdAccount] = await db
      .insert(account)
      .values({
        email,
        password: '', // Set on registration
        role: 'company',
        emailVerified: false,
      })
      .returning()
    await db.insert(company).values({
      ...values,
      accountId: createdAccount.id,
    })
  } catch (e: any) {
    return {
      error: e?.detail || 'Error inserting company. Please try again later.',
      values,
    }
  }

  return { message: 'Company registration email sent succesfully! Check your email.' }
}
