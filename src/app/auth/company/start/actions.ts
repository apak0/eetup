import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

import { registerCompanyEmailTemplate } from './register-company'

import { appName, JWT_SECRET } from '@/constants'
import { db } from '@/lib/database/db'
import { company } from '@/lib/database/schema'

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

  const registrationToken = jwt.sign({ email, firstName, lastName, organization }, JWT_SECRET, { expiresIn: '1h' })

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
