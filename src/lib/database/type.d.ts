import { InferSelectModel } from 'drizzle-orm'

import { company, product, user } from './schema'

export type UserWithPassword = InferSelectModel<typeof user>
export type User = Omit<UserWithPassword, 'password'>

export type CompanyWithPassword = InferSelectModel<typeof company>
export type Company = Omit<CompanyWithPassword, 'password'>

export type Product = InferSelectModel<typeof product>

export type UserSession = {
  user: {
    id: number
    firstName: string
    lastName: string
    organization: string
    isCompany: boolean
    email: string
    image: string
  }
}

export type CompanyWithProduct = Company & {
  product: Product[]
}
