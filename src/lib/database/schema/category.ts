import { integer, varchar, check } from 'drizzle-orm/pg-core'
import { company } from './company'
import { cs1, withTimestamps } from './utils'
import { sql } from 'drizzle-orm'

export const category = cs1.table(
  'category',
  withTimestamps({
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    companyId: integer('company_id').references(() => company.id, {
      onDelete: 'cascade',
    }),
  }),
  (table) => [check('name_min_length', sql`char_length(${table.name}) >= 2`)],
)
