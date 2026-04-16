import { pgSchema, timestamp } from 'drizzle-orm/pg-core'

export const cs1 = pgSchema('eetup-dev')

export const withTimestamps = (fields: any) => {
  return {
    ...fields,
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  }
}
