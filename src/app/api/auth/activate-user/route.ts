import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

import { JWT_SECRET } from '@/constants'
import { db } from '@/lib/database/db'
import { user } from '@/lib/database/schema'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  const token = searchParams.get('token') || ''

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

  const [foundUser] = await db.select().from(user).where(eq(user.email, decodedToken?.email))

  if (foundUser && foundUser.emailVerified) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 })
  }

  await db.update(user).set({ emailVerified: true }).where(eq(user.email, decodedToken?.email))

  return NextResponse.redirect(new URL('/hub/user/activated', req.url))
}
