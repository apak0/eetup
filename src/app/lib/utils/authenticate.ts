import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { user, User } from '../database/schema'
import { JWT_SECRET } from '@/constants'
import { db } from '../database/db'
import { eq } from 'drizzle-orm'

export async function authenticateRequest() {
  const cookieStore = await cookies()

  const token = cookieStore.get('accessToken')?.value

  console.log('ahoy1', token)

  if (!token) {
    throw new Error('Unauthorized')
  }

  try {
    const tokenUser: any = jsonwebtoken.verify(token, JWT_SECRET)
    const [foundUser] = await db.select().from(user).where(eq(user.email, tokenUser.email))

    const { password, ...rest } = foundUser
    return rest as User
  } catch {
    throw new Error('Invalid Token')
  }
}
