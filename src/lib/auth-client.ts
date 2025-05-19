// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

const baseURL =
  typeof window !== "undefined"
    ? window.location.origin                 // ⬅ always correct in the browser
    : process.env.NEXT_PUBLIC_BETTER_AUTH_URL // ⬅ SSR fallback

export const authClient = createAuthClient({ baseURL });

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  forgetPassword,
  resetPassword
} = authClient;