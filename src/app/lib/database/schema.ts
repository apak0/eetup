import { InferSelectModel } from 'drizzle-orm'
import { boolean, integer, pgSchema, varchar } from 'drizzle-orm/pg-core'

export const cs1 = pgSchema('chain-store-1')

export const user = cs1.table('user', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  password: varchar({ length: 255 }).notNull(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  isOwner: integer().default(0).notNull(),
  companyId: integer()
    .notNull()
    .references(() => company.id, { onDelete: 'cascade' }),
})

export const company = cs1.table('company', {
  id: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique(),
  active: boolean().default(false).notNull(),
})

export type UserWithPassword = InferSelectModel<typeof user>
export type User = Omit<UserWithPassword, 'password'>

export type Company = InferSelectModel<typeof company>
