// types/next-auth.d.ts
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: undefined
      role: string
      email: string
      firstName: string
      lastName: string
      organization?: string
      // Add any custom fields you have
    } & DefaultSession['user']
  }
}
