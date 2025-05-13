/* eslint-disable no-param-reassign */
import bcrypt from 'bcrypt'
import { and, eq } from 'drizzle-orm'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { db } from '@/lib/database/db'
import { company, user } from '@/lib/database/schema'
import { Company, CompanyWithPassword, User, UserWithPassword } from '@/lib/database/type'

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        const typedUser = user as (User | Company) & { isCompany: boolean }
        token.id = typedUser.id
        token.firstName = typedUser.firstName
        token.lastName = typedUser.lastName
        token.organization = (typedUser as Company).organization
        token.isCompany = typedUser.isCompany
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
        session.user.organization = token.organization
        session.user.isCompany = token.isCompany
        return session
      } else {
        return null
      }
    },
  },

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),

    CredentialsProvider({
      id: 'credentials',
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, _req) {
        if (credentials) {
          const email = credentials.username
          const password = credentials.password

          const [foundUser] = await db
            .select()
            .from(user)
            .where(and(eq(user.email, email), eq(user.emailVerified, true)))

          let entery: UserWithPassword | CompanyWithPassword = foundUser
          if (!entery) {
            entery = (
              await db
                .select()
                .from(company)
                .where(and(eq(company.email, email), eq(company.emailVerified, true)))
            )[0]
          }

          if (!entery) {
            throw new Error('User not found or not verified')
          }

          const isPasswordValid = entery.password && (await bcrypt.compare(password, entery.password))
          if (!isPasswordValid && entery.password) {
            throw new Error('Invalid credentials')
          }

          const { password: _, ...userWithoutPassword } = entery

          if (userWithoutPassword) {
            return { ...userWithoutPassword, id: userWithoutPassword.toString(), isCompany: !foundUser }
          } else {
            throw new Error('Invalid credentials')
          }
        } else {
          throw new Error('Invalid credentials')
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
