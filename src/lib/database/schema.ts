import { InferSelectModel } from 'drizzle-orm'
import { boolean, integer, pgSchema, varchar } from 'drizzle-orm/pg-core'

export const cs1 = pgSchema('eetup-dev')

export const user = cs1.table('user', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  password: varchar({ length: 255 }).notNull(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  tel: varchar({ length: 255 }),
  postcode: varchar({ length: 255 }),
  city: varchar({ length: 255 }),
  street: varchar({ length: 255 }),
  houseNumber: varchar({ length: 255 }),
  houseNumberAddition: varchar({ length: 255 }),
})

export const company = cs1.table('company', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  organization: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  active: boolean().default(false).notNull(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }),
  cocId: varchar({ length: 255 }),
  tel: varchar({ length: 255 }),
  postcode: varchar({ length: 255 }),
  city: varchar({ length: 255 }),
  street: varchar({ length: 255 }),
  houseNumber: varchar({ length: 255 }),
  houseNumberAddition: varchar({ length: 255 }),
  bannedPostcodes: varchar({ length: 255 }).array(),
})

export type UserWithPassword = InferSelectModel<typeof user>
export type User = Omit<UserWithPassword, 'password'>

export type Company = InferSelectModel<typeof company>
