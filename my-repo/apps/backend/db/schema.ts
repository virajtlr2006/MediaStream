import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  clerkID:varchar({length: 255}).notNull().unique(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  profile: varchar().default("https://imgs.search.brave.com/XYrKCK6p2WrOuI8sI82LnBt3Ntot-oVjONnFagD7-BQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/aWNvbnNob2NrLmNv/bS9pbWFnZS9Tb2Z0/L0dlbmVyYWwvdXNl/cg")
});

export type User = typeof usersTable.$inferSelect;   
export type NewUser = typeof usersTable.$inferInsert;