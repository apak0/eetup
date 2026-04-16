import { InferSelectModel } from 'drizzle-orm'

import { category, company, product, tag, user } from './schema'

export type User = InferSelectModel<typeof user>

export type Company = InferSelectModel<typeof company>

export type Product = InferSelectModel<typeof product>

export type Category = InferSelectModel<typeof category>
export type Tag = InferSelectModel<typeof tag>

export type UserSession = {
  user: {
    id: number
    email: string
    role: string
  }
}

export type CompanyWithConnections = Company & {
  product: Product[]
  category?: (Category & { product: Product[] })[]
}
