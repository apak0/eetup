import { db } from '@/lib/database/db'
import { account } from '@/lib/database/schema/account'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@/constants'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { token, password } = await req.json()
  if (!token || !password) return NextResponse.json({ error: 'Token and password are required' }, { status: 400 })

  try {
    let payload: any
    try {
      payload = jwt.verify(token, JWT_SECRET)
    } catch (e) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
    }

    const found = await db.select().from(account).where(eq(account.email, payload.email)).limit(1)
    if (!found.length || found[0].resetToken !== token) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)

    await db.update(account).set({ password: hashed, resetToken: null }).where(eq(account.email, payload.email))

    return NextResponse.json({ message: 'Password has been reset.' })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
