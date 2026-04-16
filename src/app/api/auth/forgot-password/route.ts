import { db } from '@/lib/database/db'
import { user } from '@/lib/database/schema'
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
    const found = await db.select().from(user).where(eq(user.email, email)).limit(1)
    if (found.length > 0) {
      const { firstName, lastName } = found[0]
      const token = jwt.sign({ email, firstName, lastName }, JWT_SECRET, { expiresIn: '1h' })
      await db.update(user).set({ resetToken: token }).where(eq(user.email, email))
      await sendResetEmail(email, token)
    }
    return NextResponse.json({ message: 'If the email exists, a reset link has been sent.' })
  } catch (e) {
    console.log('ahoy1', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
