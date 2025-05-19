import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "@/db";
import { video } from "@/db/schema";

/**
 * Resource route: GET /api/videos → JSON array
 */
export async function loader({}: LoaderFunctionArgs) {
  const rows = await db.select().from(video);
  console.log("[api.videos] rows", rows.length);
  return json(rows);
}
