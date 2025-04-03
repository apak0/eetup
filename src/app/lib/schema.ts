import { InferSelectModel } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: integer("id").primaryKey(),
  password: text("password").notNull(),
  username: text("name").notNull(),
  email: text("email").unique().notNull(),
  character: text("character"),
});

export const room = sqliteTable("room", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export type Room = InferSelectModel<typeof room>;

export type UserWithPassword = InferSelectModel<typeof user>;

export type User = Omit<UserWithPassword, "password">;
