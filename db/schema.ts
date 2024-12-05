import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  date,
  jsonb,
  time,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { relations } from "drizzle-orm";
import { DefaultScheduleType } from "@/app/everytime/image-upload-button";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  defaultSchedule: jsonb("absolutelyNot")
    .$type<DefaultScheduleType[]>()
    .default([])
    .notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

export interface ScheduleType {
  userName: string;
  userId: string;
  schedules: string[];
}

export const meets = pgTable("meets", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  absolutelyNot: jsonb("absolutelyNot")
    .$type<ScheduleType[]>()
    .default([])
    .notNull(),
  adjustable: jsonb("adjustable").$type<ScheduleType[]>().default([]).notNull(),
  createdAt: time("createdAt").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  meetsToUsers: many(meetsToUsers),
}));

export const meetsRelations = relations(meets, ({ many }) => ({
  meetsToUsers: many(meetsToUsers),
}));

export const meetsToUsers = pgTable(
  "meetsToUsers",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    meetId: uuid("meetId")
      .notNull()
      .references(() => meets.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.meetId] }),
  }),
);

export const meetsToUsersRelations = relations(meetsToUsers, ({ one }) => ({
  meet: one(meets, {
    fields: [meetsToUsers.meetId],
    references: [meets.id],
  }),
  user: one(users, {
    fields: [meetsToUsers.userId],
    references: [users.id],
  }),
}));
