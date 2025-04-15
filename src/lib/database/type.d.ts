import { company, product, user } from './schema'

export type UserWithPassword = InferSelectModel<typeof user>
export type User = Omit<UserWithPassword, 'password'>

export type CompanyWithPassword = InferSelectModel<typeof company>
export type Company = Omit<CompanyWithPassword, 'password'>

export type Product = InferSelectModel<typeof product>
