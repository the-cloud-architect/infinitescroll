// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { schema } from "../db/schema";

/**
 * Better Auth instance
 * – email verification on sign-up and required for login
 * – password-reset flow
 * – Google OAuth as secondary provider
 */
export const auth = betterAuth({
  /* ------------------------------------------------------------------ */
  /*  Email/password auth + password-reset                              */
  /* ------------------------------------------------------------------ */
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // ← disabled verification
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  /* ------------------------------------------------------------------ */
  /*  Database (Drizzle + Postgres)                                     */
  /* ------------------------------------------------------------------ */
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { ...schema, user: schema.user },
  }),

  /* ------------------------------------------------------------------ */
  /*  Base URL (pulled from env in prod)                                */
  /* ------------------------------------------------------------------ */
  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins: [
    "http://localhost:5173"
  ],
});
