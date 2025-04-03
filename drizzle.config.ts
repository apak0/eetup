import type { Config } from "drizzle-kit";

export default {
  schema: "./app/lib/schema.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
