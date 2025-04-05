import type { Config } from 'drizzle-kit'

export default {
  schema: './src/app/lib/database/schema.ts',
  out: './src/app/lib/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    schema: 'chain-store-1',
  },
} satisfies Config
