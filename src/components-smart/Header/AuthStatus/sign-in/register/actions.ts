'use server'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'

import { appName, JWT_SECRET } from '@/constants'
import { db } from '@/lib/database/db'
import { account } from '@/lib/database/schema/account'
import { user } from '@/lib/database/schema/user'
import { registerUserEmailTemplate } from '@/lib/templates/registerUser'
import { sendEmail } from '@/lib/utils/sendEmail'

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

  // Check for existing account
  const [foundAccount] = await db.select().from(account).where(eq(account.email, email))
  if (foundAccount && foundAccount.emailVerified) {
    return {
      error: true,
      message: 'User already exists',
      values,
    }
  }

  const registrationToken = jwt.sign({ email, firstName, lastName }, JWT_SECRET, { expiresIn: '1h' })

  const mailTemplate = registerUserEmailTemplate({ firstName, registrationToken })

  // Email options
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Register User to ${appName}`,
    html: mailTemplate,
  }

  const res = await sendEmail(mailOptions)

  if (res.rejected.length > 0) {
    return {
      error: true,
      message: 'Error sending email. Please try again later.',
      values,
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    let accountId = foundAccount?.id
    if (!accountId) {
      // Create account
      const [createdAccount] = await db
        .insert(account)
        .values({
          email,
          password: hashedPassword,
          role: 'user',
          emailVerified: false,
        })
        .returning()
      accountId = createdAccount.id
    } else {
      // Update password if account exists but not verified
      await db.update(account).set({ password: hashedPassword }).where(eq(account.email, email))
    }
    // Create user profile if not exists
    const [foundUser] = await db.select().from(user).where(eq(user.accountId, accountId))
    if (!foundUser) {
      await db.insert(user).values({
        accountId,
        firstName,
        lastName,
      })
    }
  } catch (e: any) {
    return {
      error: true,
      message: e?.detail || 'Error registering user. Please try again.',
      values,
    }
  }

  return { message: 'User created successfully' }
}
