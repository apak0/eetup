import { authenticateRequest } from '@/app/lib/utils/authenticate'
import { NextResponse } from 'next/server'

export async function GET() {
  const user = await authenticateRequest()

  return NextResponse.json(user, { status: 200 })
}
