import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { JWT_SECRET } from '@/constants'
import { db } from '@/lib/database/db'
import { company, CompanyWithPassword, user, UserWithPassword } from '@/lib/database/schema'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const [foundUser] = await db.select().from(user).where(eq(user.email, email))

  let entery: UserWithPassword | CompanyWithPassword = foundUser
  if (!entery) {
    entery = (await db.select().from(company).where(eq(company.email, email)))[0]
  }

  if (!entery) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 })
  }

  const isPasswordValid = entery.password && (await bcrypt.compare(password, entery.password))
  if (!isPasswordValid && entery.password) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 })
  }

  const { password: _, ...userWithoutPassword } = entery

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

  return NextResponse.json({ message: 'Login Successful', isCompany: !foundUser }, { status: 200 })
}
