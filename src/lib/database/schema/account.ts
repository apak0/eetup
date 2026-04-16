import { integer, varchar, boolean, timestamp } from 'drizzle-orm/pg-core'
import { cs1, withTimestamps } from './utils'

export const account = cs1.table(
  'account',
  withTimestamps({
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 255 }).unique().notNull(),
    password: varchar({ length: 255 }).notNull(),
    role: varchar({ length: 32 }).notNull(), // 'user' | 'company' | 'admin'
    emailVerified: boolean().default(false).notNull(),
    resetToken: varchar({ length: 255 }),
  }),
)
