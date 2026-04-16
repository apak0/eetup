import { integer, varchar, decimal, boolean, doublePrecision, jsonb, timestamp, unique } from 'drizzle-orm/pg-core'
import { company } from './company'
import { category } from './category'
import { cs1, withTimestamps } from './utils'

export const product = cs1.table(
  'product',
  withTimestamps({
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
  }),
  (table) => [unique().on(table.companyId, table.name)],
)
