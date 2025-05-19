// src/root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  ScrollRestoration,
  Scripts,
  useLocation,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import { useSession } from "@/lib/auth-client";
import { BottomNav } from "@/components/BottomNav";
import "./index.css";

export default function App() {
  const { data: session, isPending } = useSession();
  const location = useLocation();
  
  // Don't show bottom nav on auth pages
  const isAuthPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/signup");

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <Meta />
        <Links />
      </head>
      <body className="h-full overflow-hidden bg-black">
        <main className="h-full pb-16">
          <Outlet />
        </main>

        {!isPending && session?.user && !isAuthPage && <BottomNav />}

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  // Remix “throw redirect/json/response”
  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <title>
            {error.status} {error.statusText}
          </title>
          <Meta />
          <Links />
        </head>
        <body className="p-8 bg-gray-50 text-gray-900">
          <h1 className="text-2xl font-bold mb-4">
            {error.status} — {error.statusText}
          </h1>
          {error.data ? (
            <pre className="bg-white p-4 rounded shadow-sm overflow-auto">
              {JSON.stringify(error.data, null, 2)}
            </pre>
          ) : null}
          <Scripts />
        </body>
      </html>
    );
  }

  // JavaScript error
  if (error instanceof Error) {
    return (
      <html lang="en">
        <head>
          <title>App Error</title>
          <Meta />
          <Links />
        </head>
        <body className="p-8 bg-gray-50 text-gray-900">
          <h1 className="text-2xl font-bold mb-4">Unexpected Error</h1>
          <div className="mb-4">
            <strong className="block mb-1">Message:</strong>
            <pre className="bg-white p-4 rounded shadow-sm overflow-auto">
              {error.message}
            </pre>
          </div>
          <div>
            <strong className="block mb-1">Stack:</strong>
            <pre className="bg-white p-4 rounded shadow-sm overflow-auto text-xs">
              {error.stack}
            </pre>
          </div>
          <Scripts />
        </body>
      </html>
    );
  }

  // Fallback for unknown types
  return (
    <html lang="en">
      <head>
        <title>Unknown Error</title>
        <Meta />
        <Links />
      </head>
      <body className="p-8 bg-gray-50 text-gray-900">
        <h1 className="text-2xl font-bold mb-4">An unknown error occurred</h1>
        <Scripts />
      </body>
    </html>
  );
}
