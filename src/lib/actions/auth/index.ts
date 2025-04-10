import { eq } from 'drizzle-orm'
import nodemailer from 'nodemailer'

import { db } from '../../database/db'
import { company } from '../../database/schema'

import { registerCompanyEmailTemplate } from './mail-templates/register-company'

import { appName } from '@/constants'

export const startCompanyRegister = async (formData: FormData) => {
  const email = formData.get('email')?.toString() || ''
  const ownerName = formData.get('name')?.toString() || ''
  const cocId = formData.get('cocId')?.toString() || ''
  const organization = formData.get('organization')?.toString() || ''
  const tel = formData.get('tel')?.toString() || ''

  console.log('ahoy2', email, ownerName, cocId, organization, tel)

  const [foundCompany] = await db.select().from(company).where(eq(company.email, email))
  console.log('ahoy4', foundCompany)
  if (foundCompany) {
    return {
      error: true,
      title: 'Company already exists!',
      message:
        'If this is your company, first check your email and if you still cannot find the registration email please contact us.',
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

  const mailTemplate = registerCompanyEmailTemplate({ firstName: ownerName })

  // Email options
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Company Invitation to ${appName}`,
    text: `Register your store at ${appName} below`,
    html: mailTemplate,
  }

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending email:', error)
    }
    console.log('Email sent:', info.response)
  })

  // TODO: send email with token to register the company

  console.log('ahoy1', transporter)

  return { message: 'Company registration email sent succesfully! Check your email.' }
}

export const registerCompany = async (formData: FormData) => {
  const email = formData.get('email')?.toString() || ''
  const ownerName = formData.get('name')?.toString() || ''
  const cocId = formData.get('cocId')?.toString() || ''
  const organization = formData.get('organization')?.toString() || ''
  const tel = formData.get('tel')?.toString() || ''

  console.log('ahoy2', email, ownerName, cocId, organization, tel)

  const [foundCompany] = await db.select().from(company).where(eq(company.email, email))

  if (foundCompany) {
    return {
      error: true,
      title: 'Company already exists!',
      message:
        'If this is your company, first check your email and if you still cannot find the registration email please contact us.',
    }
  }

  // TODO: register the company in the database with inactive status

  return { message: 'Company registration email sent succesfully! Check your email.' }
}
