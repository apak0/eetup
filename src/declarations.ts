// types/next-auth.d.ts
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: undefined
      firstName?: string
      lastName?: string
      organization?: string
      isCompany?: boolean
      // Add any custom fields you have
    } & DefaultSession['user']
  }
}
