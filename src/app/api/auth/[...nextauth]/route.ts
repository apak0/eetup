/* eslint-disable no-param-reassign */
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { db } from '@/lib/database/db'
import { company, user } from '@/lib/database/schema'
import { Company, CompanyWithPassword, User, UserWithPassword } from '@/lib/database/type'

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }: { token: any; user: User | Company }) {
      if (user) {
        token.id = user.id
        token.organization = user.organization
        token.isCompany = user.isCompany
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id
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

          const [foundUser] = await db.select().from(user).where(eq(user.email, email))

          let entery: UserWithPassword | CompanyWithPassword = foundUser
          if (!entery) {
            entery = (await db.select().from(company).where(eq(company.email, email)))[0]
          }

          if (!entery) {
            return null
          }

          const isPasswordValid = entery.password && (await bcrypt.compare(password, entery.password))
          if (!isPasswordValid && entery.password) {
            return null
          }

          const { password: _, ...userWithoutPassword } = entery

          if (userWithoutPassword) {
            return { ...userWithoutPassword, isCompany: !foundUser }
          } else {
            return null
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
