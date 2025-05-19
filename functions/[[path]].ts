import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as buildOriginal from "../build/index.js"; // adjust path if needed
import type { ServerBuild } from "@remix-run/server-runtime";

// inject the required `isSpaMode` flag so the type matches ServerBuild
const build = {
  ...(buildOriginal as Record<string, unknown>),
  isSpaMode: false,
} as ServerBuild;

export const onRequest = createPagesFunctionHandler({
  build,
});
