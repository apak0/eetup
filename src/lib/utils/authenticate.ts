import { eq } from 'drizzle-orm'
import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'

import { db } from '../database/db'
import { company, CompanyWithPassword, User, user, UserWithPassword } from '../database/schema'

import { JWT_SECRET } from '@/constants'

export async function authenticateRequest() {
  const cookieStore = await cookies()

  const token = cookieStore.get('accessToken')?.value

  if (!token) {
    throw new Error('Unauthorized')
  }

  try {
    const tokenUser: any = jsonwebtoken.verify(token, JWT_SECRET)
    const [foundUser] = await db.select().from(user).where(eq(user.email, tokenUser.email))

    let entery: UserWithPassword | CompanyWithPassword = foundUser
    if (!entery) {
      entery = (await db.select().from(company).where(eq(company.email, tokenUser.email)))[0]
    }

    const { password, ...rest } = entery
    return rest as User
  } catch {
    throw new Error('Invalid Token')
  }
}
