import { relations } from 'drizzle-orm'
import { boolean, decimal, doublePrecision, integer, jsonb, pgSchema, varchar } from 'drizzle-orm/pg-core'

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
  lat: doublePrecision('lat'),
  lon: doublePrecision('lon'),
})

export const product = cs1.table('product', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  companyId: integer('company_id')
    .notNull()
    .references(() => company.id),
  name: varchar({ length: 255 }).notNull().unique(),
  description: varchar({ length: 255 }).notNull(),
  price: decimal().notNull(),
  discountPrice: decimal(),
  image: varchar({ length: 2000 }).notNull(),
  active: boolean().default(false).notNull(),
  categories: integer().array(),
  allergens: integer().array(),
  dietary: integer().array(),
  addCartPreferencesChecked: boolean().default(false).notNull(),
  addCartPreferences: jsonb('addCartPreferences').default('[]').notNull(),
})

export const companyRelations = relations(company, ({ many }) => ({
  product: many(product),
}))

export const productRelations = relations(product, ({ one }) => ({
  company: one(company, {
    fields: [product.companyId],
    references: [company.id],
  }),
}))
