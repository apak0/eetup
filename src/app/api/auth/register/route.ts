import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/database/db'
import { user } from '@/lib/database/schema'

export async function POST(req: NextRequest) {
  const { email, firstName, lastName, password } = await req.json()

  const [foundUser] = await db.select().from(user).where(eq(user.email, email))

  if (foundUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = { email, firstName, lastName, password: hashedPassword }

  await db.insert(user).values(newUser)

  return NextResponse.json({ message: 'User created successfully' }, { status: 200 })
}
