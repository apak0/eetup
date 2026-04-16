import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import { UserSession } from '../database/type'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession<any, UserSession>(...args, authOptions)
}
