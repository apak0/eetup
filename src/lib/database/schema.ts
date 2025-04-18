import { relations } from 'drizzle-orm'
import { boolean, decimal, integer, pgSchema, varchar } from 'drizzle-orm/pg-core'

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
  emailVerified: boolean().default(false).notNull(),
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
  emailVerified: boolean().default(false).notNull(),
  minEstimatedDeliveryTime: integer().default(0).notNull(),
  maxEstimatedDeliveryTime: integer().default(0).notNull(),
  deliveryFee: decimal().default('0').notNull(),
  score: integer().default(0).notNull(),
})

export const product = cs1.table('product', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  companyId: integer('company_id').references(() => company.id),
  name: varchar({ length: 255 }).notNull().unique(),
  description: varchar({ length: 255 }).notNull(),
  price: decimal().notNull(),
  discount_price: decimal(),
  image: varchar({ length: 2000 }).notNull(),
  active: boolean().default(false).notNull(),
  categories: varchar({ length: 255 }).array(),
  allergens: varchar({ length: 255 }).array(),
  dietary: varchar({ length: 255 }).array(),
})

export const productCompanyRelation = relations(company, ({ many }) => ({
  product: many(product),
}))
