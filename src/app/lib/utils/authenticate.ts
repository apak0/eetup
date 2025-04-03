import { JWT_SECRET, users } from '@/app/api/db'
import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { User } from '../schema'

export function authenticateRequest() {
  const token = cookies().get('accessToken')?.value

  console.log('ahoy1', token)

  if (!token) {
    throw new Error('Unauthorized')
  }

  try {
    const user: any = jsonwebtoken.verify(token, JWT_SECRET)
    const { password, ...foundUser } = users[user.email]
    return foundUser as User
  } catch {
    throw new Error('Invalid Token')
  }
}
