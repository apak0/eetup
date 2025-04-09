import { NextResponse } from 'next/server'

import { authenticateRequest } from '@/app/lib/utils/authenticate'

export async function GET() {
  const user = await authenticateRequest()

  return NextResponse.json(user, { status: 200 })
}
