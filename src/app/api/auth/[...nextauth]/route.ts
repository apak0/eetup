/* eslint-disable no-param-reassign */
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { db } from '@/lib/database/db'
import { account } from '@/lib/database/schema/account'
import { company } from '@/lib/database/schema/company'
import { user } from '@/lib/database/schema/user'

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.organization = user.organization
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
        session.user.organization = token.organization
        return session
      } else {
        return null
      }
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),

    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, _req) {
        if (!credentials) throw new Error('Invalid credentials')
        const email = credentials.username
        const password = credentials.password

        // Find account by email
        const foundAccount = await db.query.account.findFirst({
          where: eq(account.email, email),
        })
        if (!foundAccount || !foundAccount.emailVerified) {
          throw new Error('Account not found or not verified')
        }
        // Check password
        if (!(await bcrypt.compare(password, foundAccount.password))) {
          throw new Error('Invalid credentials')
        }
        // Get profile info (user or company)
        let profile = null
        if (foundAccount.role === 'user') {
          profile = await db.query.user.findFirst({ where: eq(user.accountId, foundAccount.id) })
        } else if (foundAccount.role === 'company') {
          profile = await db.query.company.findFirst({ where: eq(company.accountId, foundAccount.id) })
        }
        if (!profile) throw new Error('Profile not found')
        const base = {
          id: foundAccount.id.toString(),
          role: foundAccount.role,
          email: foundAccount.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
        }
        if (foundAccount.role === 'company' && 'organization' in profile) {
          return { ...base, organization: profile.organization }
        }
        return base
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
