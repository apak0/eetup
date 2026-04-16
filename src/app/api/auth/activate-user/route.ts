import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

import { JWT_SECRET } from '@/constants'
import { db } from '@/lib/database/db'
import { account } from '@/lib/database/schema/account'

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

  const [foundAccount] = await db.select().from(account).where(eq(account.email, decodedToken?.email))

  if (foundAccount && foundAccount.emailVerified) {
    return NextResponse.json({ message: 'Account already activated' }, { status: 400 })
  }

  await db.update(account).set({ emailVerified: true }).where(eq(account.email, decodedToken?.email))

  return NextResponse.redirect(new URL('/hub/user/activated', req.url))
}
