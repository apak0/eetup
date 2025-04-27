'use server'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

import { registerUserEmailTemplate } from './register-user'

import { appName, JWT_SECRET } from '@/constants'
import { db } from '@/lib/database/db'
import { user } from '@/lib/database/schema'

export const registerUserAction = async (_prevState: any, formData: FormData) => {
  const email = formData.get('email')?.toString() || ''
  const firstName = formData.get('firstName')?.toString() || ''
  const lastName = formData.get('lastName')?.toString() || ''
  const password = formData.get('password')?.toString() || ''

  const values = {
    email,
    firstName,
    lastName,
  }

  const [foundUser] = await db.select().from(user).where(eq(user.email, email))
  if (foundUser && foundUser.emailVerified) {
    return {
      error: true,
      message: 'User already exists',
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

  const registrationToken = jwt.sign({ email, firstName, lastName }, JWT_SECRET, { expiresIn: '1h' })

  const mailTemplate = registerUserEmailTemplate({ firstName, registrationToken })

  // Email options
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Register User to ${appName}`,
    html: mailTemplate,
  }

  // Send the email
  const res = await transporter.sendMail(mailOptions)

  if (res.rejected.length > 0) {
    return {
      error: true,
      message: 'Error sending email. Please try again later.',
      values,
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = { email, firstName, lastName, password: hashedPassword }

  try {
    await db.insert(user).values(newUser)
  } catch (e: any) {
    return {
      error: true,
      message: e?.detail || 'Error registering user. Please try again.',
      values,
    }
  }

  return { message: 'User created successfully' }
}
