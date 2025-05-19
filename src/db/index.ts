import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Must be HTTPS URL: postgres://user:pass@host/db
const connectionString = process.env.DATABASE_URL!;
const sql = neon(connectionString);

export const db = drizzle(sql, { schema });