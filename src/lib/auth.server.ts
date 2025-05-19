// src/lib/auth.server.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { schema } from "../db/schema";

/* ------------------------------------------------------------------ */
/*  Better-Auth instance                                              */
/* ------------------------------------------------------------------ */
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { ...schema, user: schema.user },
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: ["http://localhost:5173"],
});

/* ------------------------------------------------------------------ */
/*  Helper for loaders/actions – cast silences the bad .d.ts          */
/* ------------------------------------------------------------------ */
export const validateRequest = (auth as any)
  .validateRequest as (req: Request) => Promise<{
  user: typeof schema.user.$inferSelect | null;
  session: unknown;
}>;
