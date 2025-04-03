import type { Config } from 'drizzle-kit'

export default {
  schema: './src/app/lib/db/schema.ts',
  out: './src/app/lib/db/migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config
