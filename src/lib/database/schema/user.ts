import { integer, varchar } from 'drizzle-orm/pg-core'

import { account } from './account'
import { cs1, withTimestamps } from './utils'

export const user = cs1.table(
  'user',
  withTimestamps({
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    accountId: integer()
      .notNull()
      .references(() => account.id, { onDelete: 'cascade' }),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }).notNull(),
    tel: varchar({ length: 255 }),
    postcode: varchar({ length: 255 }),
    city: varchar({ length: 255 }),
    street: varchar({ length: 255 }),
    houseNumber: varchar({ length: 255 }),
    houseNumberAddition: varchar({ length: 255 }),
  }),
)
