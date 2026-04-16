import { integer, varchar, boolean, decimal, doublePrecision } from 'drizzle-orm/pg-core'
import { account } from './account'
import { cs1, withTimestamps } from './utils'

export const company = cs1.table(
  'company',
  withTimestamps({
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    accountId: integer()
      .notNull()
      .references(() => account.id, { onDelete: 'cascade' }),
    organization: varchar({ length: 255 }).notNull(),
    active: boolean().default(false).notNull(),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }).notNull(),
    cocId: varchar({ length: 255 }),
    tel: varchar({ length: 255 }),
    postcode: varchar({ length: 255 }),
    city: varchar({ length: 255 }),
    street: varchar({ length: 255 }),
    houseNumber: varchar({ length: 255 }),
    houseNumberAddition: varchar({ length: 255 }),
    bannedPostcodes: varchar().array(),
    minEstimatedDeliveryTime: integer().default(0).notNull(),
    maxEstimatedDeliveryTime: integer().default(0).notNull(),
    deliveryFee: decimal().default('0').notNull(),
    score: integer().default(0).notNull(),
    lat: doublePrecision('lat'),
    lon: doublePrecision('lon'),
  }),
)
