import {
    pgTable,
    text,
    timestamp,
    boolean,
    integer,
    index,
    serial,
  } from "drizzle-orm/pg-core";
  import { sql } from "drizzle-orm/sql";
  
  /* ───────── Auth (updated with profile fields) ───────── */
  export const user = pgTable(
    "user",
    {
      id: text("id").primaryKey(),
      name: text("name").notNull(),
      email: text("email").notNull().unique(),
      emailVerified: boolean("email_verified").notNull(),
      image: text("image"),
      // New profile fields
      bio: text("bio"),
      location: text("location"),
      username: text("username").unique(),
      // Original fields
      createdAt: timestamp("created_at").notNull(),
      updatedAt: timestamp("updated_at").notNull(),
    },
    (t) => ({
      idx_user_created_at: index("idx_user_created_at").on(t.createdAt),
    }),
  );
  
  export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id").notNull().references(() => user.id, {
      onDelete: "cascade",
    }),
  });
  
  export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  });
  
  export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
  });
  
  /* ───────── Video feature (updated with title) ───────── */
  export const video = pgTable(
    "video",
    {
      id: serial("id").primaryKey(),
      userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
      url: text("url").notNull(),
      title: text("title"), // New field for video title
      createdAt: timestamp("created_at").notNull().default(sql`now()`),
      thumbsUp: integer("thumbs_up").notNull().default(0),
      thumbsDown: integer("thumbs_down").notNull().default(0),
    },
    (t) => ({
      idx_video_created: index("idx_video_created").on(t.createdAt),
    }),
  );
  
  export const videoComment = pgTable(
    "video_comment",
    {
      id: serial("id").primaryKey(),
      videoId: integer("video_id")
        .notNull()
        .references(() => video.id, { onDelete: "cascade" }),
      userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
      body: text("body").notNull(),
      createdAt: timestamp("created_at").notNull().default(sql`now()`),
    },
    (t) => ({
      idx_comment_video: index("idx_comment_video").on(t.videoId),
    }),
  );
  
  /* ───────── Direct Messages (new) ───────── */
  export const directMessage = pgTable(
    "direct_message",
    {
      id: serial("id").primaryKey(),
      senderId: text("sender_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
      receiverId: text("receiver_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
      message: text("message").notNull(),
      read: boolean("read").notNull().default(false),
      createdAt: timestamp("created_at").notNull().default(sql`now()`),
    },
    (t) => ({
      idx_dm_sender: index("idx_dm_sender").on(t.senderId),
      idx_dm_receiver: index("idx_dm_receiver").on(t.receiverId),
      idx_dm_created: index("idx_dm_created").on(t.createdAt),
    }),
  );
  
  /* ───────── Bundle for Drizzle Kit ───────── */
  export const schema = {
    user,
    session,
    account,
    verification,
    video,
    videoComment,
    directMessage,
  };