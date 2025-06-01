import { Product } from '@/lib/database/type'

export type Preference = Product & {
  qty: number
  selections: { [k: string]: { label: string; price: string }[] }
}
