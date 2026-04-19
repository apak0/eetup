import { relations } from 'drizzle-orm'

import { account } from './account'
import { category } from './category'
import { company } from './company'
import { product } from './product'
import { tag } from './tag'
import { user } from './user'

//// Relations

// Account to User (one-to-one)
export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.id],
    references: [user.accountId],
  }),
  company: one(company, {
    fields: [account.id],
    references: [company.accountId],
  }),
}))

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
