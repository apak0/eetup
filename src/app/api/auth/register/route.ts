import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

import { registerUserEmailTemplate } from './register-user'

import { appName, JWT_SECRET } from '@/constants'
import { db } from '@/lib/database/db'
import { user } from '@/lib/database/schema'

export async function POST(req: NextRequest) {
  const { email, firstName, lastName, password } = await req.json()

  const [foundUser] = await db.select().from(user).where(eq(user.email, email))

  if (foundUser && foundUser.emailVerified) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 })
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
  await transporter.sendMail(mailOptions)

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = { email, firstName, lastName, password: hashedPassword }

  await db.insert(user).values(newUser)

  const { password: _, ...userWithoutPassword } = newUser

  const accessToken = jsonwebtoken.sign(userWithoutPassword, JWT_SECRET, { expiresIn: '1d' })
  const refreshToken = jsonwebtoken.sign({}, JWT_SECRET, { expiresIn: '1w' })

  const cookieStore = await cookies()

  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // One day
    path: '/',
  })
  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  })

  return NextResponse.json({ message: 'User created successfully' }, { status: 200 })
}
