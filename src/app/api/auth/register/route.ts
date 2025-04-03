import bcrypt from 'bcrypt'
import { NextRequest } from 'next/server'
import { db } from '@/app/lib/database/db'
import { user } from '@/app/lib/database/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  const { email, username, password } = await req.json()

  const [foundUser] = await db.select().from(user).where(eq(user.email, email))

  if (foundUser) {
    return new Response('User already exists', {
      status: 400,
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = { email, username, password: hashedPassword }
  await db.insert(user).values(newUser)

  return new Response('User registered successfully', {
    status: 200,
  })
}
