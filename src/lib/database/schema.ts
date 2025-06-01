import { relations, sql } from 'drizzle-orm'
import { boolean, check, decimal, doublePrecision, integer, jsonb, pgSchema, unique, varchar } from 'drizzle-orm/pg-core'

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
  bannedPostcodes: varchar().array(),
  emailVerified: boolean().default(false).notNull(),
  minEstimatedDeliveryTime: integer().default(0).notNull(),
  maxEstimatedDeliveryTime: integer().default(0).notNull(),
  deliveryFee: decimal().default('0').notNull(),
  score: integer().default(0).notNull(),
  lat: doublePrecision('lat'),
  lon: doublePrecision('lon'),
})

export const product = cs1.table(
  'product',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    companyId: integer('company_id')
      .notNull()
      .references(() => company.id, {
        onDelete: 'cascade',
      }),
    name: varchar({ length: 255 }).notNull().unique(),
    description: varchar({ length: 1000 }).notNull(),
    price: decimal().notNull(),
    discountPrice: decimal(),
    image: varchar().notNull(),
    active: boolean().default(false).notNull(),
    categoryId: integer().references(() => category.id, { onDelete: 'set null' }),
    allergens: integer().array(),
    dietary: integer().array(),
    addCartPreferencesChecked: boolean().default(false).notNull(),
    addCartPreferences: jsonb('addCartPreferences').default('[]').notNull(),
  },
  (table) => [unique().on(table.companyId, table.name)],
)

export const category = cs1.table(
  'category',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    companyId: integer('company_id').references(() => company.id, {
      onDelete: 'cascade',
    }),
  },
  (table) => [unique().on(table.companyId, table.name), check('name_min_length', sql`char_length(${table.name}) >= 2`)],
)

export const tag = cs1.table(
  'tag',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name').notNull(),
    companyId: integer('company_id').references(() => company.id, {
      onDelete: 'cascade',
    }),
  },
  (table) => [unique().on(table.companyId, table.name), check('name_min_length', sql`char_length(${table.name}) >= 2`)],
)

//// Relations

export const companyRelations = relations(company, ({ many }) => ({
  product: many(product),
  category: many(category),
  tags: many(tag),
}))

export const productRelations = relations(product, ({ one }) => ({
  company: one(company, {
    fields: [product.companyId],
    references: [company.id],
  }),
  category: one(category, {
    fields: [product.categoryId],
    references: [category.id],
  }),
}))

export const categoryRelations = relations(category, ({ one, many }) => ({
  company: one(company, {
    fields: [category.companyId],
    references: [company.id],
  }),
  product: many(product),
}))

export const tagRelations = relations(tag, ({ one }) => ({
  company: one(company, {
    fields: [tag.companyId],
    references: [company.id],
  }),
}))
