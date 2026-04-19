import { sql } from 'drizzle-orm'
import { check, integer, varchar } from 'drizzle-orm/pg-core'

import { company } from './company'
import { cs1, withTimestamps } from './utils'

export const tag = cs1.table(
  'tag',
  withTimestamps({
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name').notNull(),
    companyId: integer('company_id').references(() => company.id, {
      onDelete: 'cascade',
    }),
  }),
  (table) => [check('name_min_length', sql`char_length(${table.name}) >= 2`)],
)
