import { db } from '@/lib/database/db'
import { account } from '@/lib/database/schema/account'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { resetPasswordEmailTemplate } from '@/lib/templates/resetPassword'
import { sendEmail } from '@/lib/utils/sendEmail'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@/constants'

async function sendResetEmail(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.FRONTEND_LINK
  const link = `${baseUrl}/auth/reset-password?token=${token}`
  const html = resetPasswordEmailTemplate(link)
  await sendEmail({
    to: email,
    subject: 'Reset your EetUp password',
    html,
  })
}

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

  try {
    const found = await db.select().from(account).where(eq(account.email, email)).limit(1)
    if (found.length > 0) {
      // Optionally, you can join to user/company for firstName/lastName if needed
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' })
      await db.update(account).set({ resetToken: token }).where(eq(account.email, email))
      await sendResetEmail(email, token)
    }
    return NextResponse.json({ message: 'If the email exists, a reset link has been sent.' })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
