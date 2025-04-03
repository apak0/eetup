import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()

  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')

  return new Response(JSON.stringify({ message: 'Logout Successful' }), {
    status: 200,
  })
}
