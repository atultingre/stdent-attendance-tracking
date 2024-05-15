import {
  boolean,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const GRADES = pgTable("grades", {
  id: integer("id", { length: 11 }).primaryKey(),
  grade: varchar("grade", { length: 10 }).notNull(),
});

export const STUDENTS = pgTable("students", {
  id: serial("id", { length: 11 }).primaryKey(),
  name: varchar("name", { length: 20 }).notNull(),
  grade: varchar("grade", { length: 10 }).notNull(),
  address: varchar("address", { length: 50 }),
  contact: varchar("contact", { length: 11 }),
});

export const ATTENDANCE = pgTable("attendance", {
  id: serial("id", { length: 11 }).primaryKey(),
  studentId: integer("studentId", { length: 11 }).notNull(),
  present: boolean("present").default(false),
  day: integer("day", { length: 20 }).notNull(), //11
  date: varchar("date", { length: 20 }).notNull(), //05/2024
});
