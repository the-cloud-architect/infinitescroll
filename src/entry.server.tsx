// src/entry.server.tsx   (fixed)
import type { EntryContext } from "@remix-run/node";
import { PassThrough } from "stream";
import React from "react";
import { RemixServer } from "@remix-run/react";
/**
 * Node exposes `react-dom/server` only as CommonJS, but an `import * as`
 * namespace still contains `renderToPipeableStream`.
 */
import * as ReactDOMServer from "react-dom/server";

export default function handleRequest(
  request: Request,
  statusCode: number,
  headers: Headers,
  context: EntryContext
) {
  return new Promise<Response>((resolve, reject) => {
    let didError = false;

    const { pipe } = ReactDOMServer.renderToPipeableStream(
      <RemixServer context={context} url={request.url} />,
      {
        onShellReady() {
          headers.set("Content-Type", "text/html");
          const body = new PassThrough();
          resolve(
            new Response(body as unknown as ReadableStream, {
              status: didError ? 500 : statusCode,
              headers,
            })
          );
          pipe(body);
        },
        onShellError(err: unknown) {
          reject(err);
        },
        onError(err: unknown) {
          didError = true;
          console.error(err);
        },
      }
    );
  });
}
