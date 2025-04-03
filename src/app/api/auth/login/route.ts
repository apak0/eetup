import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { user } from '@/app/lib/database/schema'
import { eq } from 'drizzle-orm'
import { db } from '@/app/lib/database/db'
import { JWT_SECRET } from '@/constants'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const [foundUser] = await db.select().from(user).where(eq(user.email, email))

  if (!foundUser) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 })
  }

  const isPasswordValid = await bcrypt.compare(password, foundUser.password)
  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 })
  }
  const { password: _, ...userWithoutPassword } = foundUser

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

  return NextResponse.json({ message: 'Login Successful' }, { status: 200 })
}
