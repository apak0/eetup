import type { Config } from 'drizzle-kit'

export default {
  schema: './src/app/lib/database/schema.ts',
  out: './src/app/lib/database/migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config
