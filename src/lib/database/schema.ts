import { InferSelectModel } from 'drizzle-orm'
import { boolean, integer, pgSchema, varchar } from 'drizzle-orm/pg-core'

export const cs1 = pgSchema('eetup-dev')

export const user = cs1.table('user', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  password: varchar({ length: 255 }).notNull(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
})

export const company = cs1.table('company', {
  id: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  active: boolean().default(false).notNull(),
  password: varchar({ length: 255 }).notNull(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
})

export type UserWithPassword = InferSelectModel<typeof user>
export type User = Omit<UserWithPassword, 'password'>

export type Company = InferSelectModel<typeof company>
