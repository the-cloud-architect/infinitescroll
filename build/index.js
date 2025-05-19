var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// src/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "stream";
import { RemixServer } from "@remix-run/react";
import * as ReactDOMServer from "react-dom/server";
import { jsx } from "react/jsx-runtime";
function handleRequest(request, statusCode, headers, context) {
  return new Promise((resolve, reject) => {
    let didError = !1, { pipe } = ReactDOMServer.renderToPipeableStream(
      /* @__PURE__ */ jsx(RemixServer, { context, url: request.url }),
      {
        onShellReady() {
          headers.set("Content-Type", "text/html");
          let body = new PassThrough();
          resolve(
            new Response(body, {
              status: didError ? 500 : statusCode,
              headers
            })
          ), pipe(body);
        },
        onShellError(err) {
          reject(err);
        },
        onError(err) {
          didError = !0, console.error(err);
        }
      }
    );
  });
}

// src/root.tsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  ScrollRestoration,
  Scripts,
  useLocation as useLocation2,
  isRouteErrorResponse,
  useRouteError
} from "@remix-run/react";

// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
var baseURL = typeof window < "u" ? window.location.origin : process.env.NEXT_PUBLIC_BETTER_AUTH_URL, authClient = createAuthClient({ baseURL }), {
  signIn,
  signOut,
  signUp,
  useSession,
  forgetPassword,
  resetPassword
} = authClient;

// src/components/BottomNav.tsx
import { Link, useLocation } from "@remix-run/react";
import { User, Home, MessageSquare } from "lucide-react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function BottomNav() {
  let location = useLocation(), isActive = (path) => location.pathname === path;
  return /* @__PURE__ */ jsxs("div", { className: "fixed bottom-0 left-0 right-0 h-16 border-t bg-black flex items-center justify-around z-50", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/profile",
        className: `flex flex-col items-center justify-center w-1/3 ${isActive("/profile") ? "text-white" : "text-gray-400"}`,
        children: [
          /* @__PURE__ */ jsx2(User, { size: 24 }),
          /* @__PURE__ */ jsx2("span", { className: "text-xs mt-1", children: "Profile" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/",
        className: `flex flex-col items-center justify-center w-1/3 ${isActive("/") ? "text-white" : "text-gray-400"}`,
        children: [
          /* @__PURE__ */ jsx2(Home, { size: 24 }),
          /* @__PURE__ */ jsx2("span", { className: "text-xs mt-1", children: "For You" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/messages",
        className: `flex flex-col items-center justify-center w-1/3 ${isActive("/messages") ? "text-white" : "text-gray-400"}`,
        children: [
          /* @__PURE__ */ jsx2(MessageSquare, { size: 24 }),
          /* @__PURE__ */ jsx2("span", { className: "text-xs mt-1", children: "Messages" })
        ]
      }
    )
  ] });
}

// src/root.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function App() {
  let { data: session2, isPending } = useSession(), location = useLocation2(), isAuthPage = location.pathname.includes("/login") || location.pathname.includes("/signup");
  return /* @__PURE__ */ jsxs2("html", { lang: "en", className: "h-full", children: [
    /* @__PURE__ */ jsxs2("head", { children: [
      /* @__PURE__ */ jsx3("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx3(
        "meta",
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        }
      ),
      /* @__PURE__ */ jsx3(Meta, {}),
      /* @__PURE__ */ jsx3(Links, {})
    ] }),
    /* @__PURE__ */ jsxs2("body", { className: "h-full overflow-hidden bg-black", children: [
      /* @__PURE__ */ jsx3("main", { className: "h-full pb-16", children: /* @__PURE__ */ jsx3(Outlet, {}) }),
      !isPending && session2?.user && !isAuthPage && /* @__PURE__ */ jsx3(BottomNav, {}),
      /* @__PURE__ */ jsx3(ScrollRestoration, {}),
      /* @__PURE__ */ jsx3(Scripts, {}),
      /* @__PURE__ */ jsx3(LiveReload, {})
    ] })
  ] });
}
function ErrorBoundary() {
  let error = useRouteError();
  return console.error(error), isRouteErrorResponse(error) ? /* @__PURE__ */ jsxs2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs2("head", { children: [
      /* @__PURE__ */ jsxs2("title", { children: [
        error.status,
        " ",
        error.statusText
      ] }),
      /* @__PURE__ */ jsx3(Meta, {}),
      /* @__PURE__ */ jsx3(Links, {})
    ] }),
    /* @__PURE__ */ jsxs2("body", { className: "p-8 bg-gray-50 text-gray-900", children: [
      /* @__PURE__ */ jsxs2("h1", { className: "text-2xl font-bold mb-4", children: [
        error.status,
        " \u2014 ",
        error.statusText
      ] }),
      error.data ? /* @__PURE__ */ jsx3("pre", { className: "bg-white p-4 rounded shadow-sm overflow-auto", children: JSON.stringify(error.data, null, 2) }) : null,
      /* @__PURE__ */ jsx3(Scripts, {})
    ] })
  ] }) : error instanceof Error ? /* @__PURE__ */ jsxs2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs2("head", { children: [
      /* @__PURE__ */ jsx3("title", { children: "App Error" }),
      /* @__PURE__ */ jsx3(Meta, {}),
      /* @__PURE__ */ jsx3(Links, {})
    ] }),
    /* @__PURE__ */ jsxs2("body", { className: "p-8 bg-gray-50 text-gray-900", children: [
      /* @__PURE__ */ jsx3("h1", { className: "text-2xl font-bold mb-4", children: "Unexpected Error" }),
      /* @__PURE__ */ jsxs2("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx3("strong", { className: "block mb-1", children: "Message:" }),
        /* @__PURE__ */ jsx3("pre", { className: "bg-white p-4 rounded shadow-sm overflow-auto", children: error.message })
      ] }),
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx3("strong", { className: "block mb-1", children: "Stack:" }),
        /* @__PURE__ */ jsx3("pre", { className: "bg-white p-4 rounded shadow-sm overflow-auto text-xs", children: error.stack })
      ] }),
      /* @__PURE__ */ jsx3(Scripts, {})
    ] })
  ] }) : /* @__PURE__ */ jsxs2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs2("head", { children: [
      /* @__PURE__ */ jsx3("title", { children: "Unknown Error" }),
      /* @__PURE__ */ jsx3(Meta, {}),
      /* @__PURE__ */ jsx3(Links, {})
    ] }),
    /* @__PURE__ */ jsxs2("body", { className: "p-8 bg-gray-50 text-gray-900", children: [
      /* @__PURE__ */ jsx3("h1", { className: "text-2xl font-bold mb-4", children: "An unknown error occurred" }),
      /* @__PURE__ */ jsx3(Scripts, {})
    ] })
  ] });
}

// src/routes/api.uploadthing.tsx
var api_uploadthing_exports = {};
__export(api_uploadthing_exports, {
  fileRouter: () => fileRouter
});
import { createUploadthing } from "uploadthing/server";

// src/db/index.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// src/db/schema.ts
var schema_exports = {};
__export(schema_exports, {
  account: () => account,
  directMessage: () => directMessage,
  schema: () => schema,
  session: () => session,
  user: () => user,
  verification: () => verification,
  video: () => video,
  videoComment: () => videoComment
});
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  index,
  serial
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";
var user = pgTable(
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
    updatedAt: timestamp("updated_at").notNull()
  },
  (t) => ({
    idx_user_created_at: index("idx_user_created_at").on(t.createdAt)
  })
), session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, {
    onDelete: "cascade"
  })
}), account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull()
}), verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at")
}), video = pgTable(
  "video",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    title: text("title"),
    // New field for video title
    createdAt: timestamp("created_at").notNull().default(sql`now()`),
    thumbsUp: integer("thumbs_up").notNull().default(0),
    thumbsDown: integer("thumbs_down").notNull().default(0)
  },
  (t) => ({
    idx_video_created: index("idx_video_created").on(t.createdAt)
  })
), videoComment = pgTable(
  "video_comment",
  {
    id: serial("id").primaryKey(),
    videoId: integer("video_id").notNull().references(() => video.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    body: text("body").notNull(),
    createdAt: timestamp("created_at").notNull().default(sql`now()`)
  },
  (t) => ({
    idx_comment_video: index("idx_comment_video").on(t.videoId)
  })
), directMessage = pgTable(
  "direct_message",
  {
    id: serial("id").primaryKey(),
    senderId: text("sender_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    receiverId: text("receiver_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    message: text("message").notNull(),
    read: boolean("read").notNull().default(!1),
    createdAt: timestamp("created_at").notNull().default(sql`now()`)
  },
  (t) => ({
    idx_dm_sender: index("idx_dm_sender").on(t.senderId),
    idx_dm_receiver: index("idx_dm_receiver").on(t.receiverId),
    idx_dm_created: index("idx_dm_created").on(t.createdAt)
  })
), schema = {
  user,
  session,
  account,
  verification,
  video,
  videoComment,
  directMessage
};

// src/db/index.ts
var connectionString = process.env.DATABASE_URL, sql2 = neon(connectionString), db = drizzle(sql2, { schema: schema_exports });

// src/routes/api.uploadthing.tsx
import { z } from "zod";
var f = createUploadthing(), fileRouter = {
  videoUploader: f({ video: { maxFileSize: "128MB" } }).input(z.object({ userId: z.string() })).middleware(async ({ input }) => ({ userId: input.userId })).onUploadComplete(async ({ metadata, file }) => (console.log("[onUploadComplete] fileData", file), await db.insert(video).values({
    userId: metadata.userId,
    url: file.url,
    createdAt: /* @__PURE__ */ new Date()
  }), { uploadedBy: metadata.userId }))
};

// src/routes/api.auth.$.tsx
var api_auth_exports = {};
__export(api_auth_exports, {
  action: () => action,
  loader: () => loader
});

// src/lib/auth.server.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
var auth = betterAuth({
  emailAndPassword: {
    enabled: !0,
    requireEmailVerification: !1,
    minPasswordLength: 8,
    maxPasswordLength: 128
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { ...schema, user: schema.user }
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: ["http://localhost:5173"]
}), validateRequest = auth.validateRequest;

// src/routes/api.auth.$.tsx
async function loader({ request }) {
  return auth.handler(request);
}
async function action({ request }) {
  return auth.handler(request);
}

// src/routes/api.videos.tsx
var api_videos_exports = {};
__export(api_videos_exports, {
  loader: () => loader2
});
import { json } from "@remix-run/node";
async function loader2({}) {
  let rows = await db.select().from(video);
  return console.log("[api.videos] rows", rows.length), json(rows);
}

// src/routes/messages.tsx
var messages_exports = {};
__export(messages_exports, {
  action: () => action2,
  default: () => MessagesPage,
  loader: () => loader3
});
import { json as json2, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { useState } from "react";
import { eq, ne, or, and, desc, aliasedTable } from "drizzle-orm";

// src/components/ui/button.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/button.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = !1,
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    asChild ? Slot : "button",
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

// src/components/ui/input.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx5(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}

// src/routes/messages.tsx
import { ArrowLeft, Send, Plus } from "lucide-react";
import { Fragment, jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
function uniqueConversations(messages, me) {
  let map = /* @__PURE__ */ new Map();
  for (let m of messages) {
    let otherId = m.senderId === me ? m.receiverId : m.senderId, otherName = m.senderId === me ? m.receiverName : m.senderName, entry2 = map.get(otherId) ?? {
      id: otherId,
      name: otherName,
      lastMessage: m.message,
      lastMessageTime: m.createdAt,
      unreadCount: m.senderId !== me && !m.read ? 1 : 0
    };
    m.createdAt > entry2.lastMessageTime && (entry2.lastMessage = m.message, entry2.lastMessageTime = m.createdAt), m.senderId !== me && !m.read && (entry2.unreadCount += 1), map.set(otherId, entry2);
  }
  return Array.from(map.values());
}
async function loader3({ request }) {
  let session2 = await auth.api.getSession({ headers: request.headers });
  if (!session2?.user)
    return redirect("/login");
  let sessionUser = session2.user, sender = aliasedTable(user, "sender"), receiver = aliasedTable(user, "receiver"), messages = (await db.select({
    id: directMessage.id,
    senderId: directMessage.senderId,
    senderName: sender.name,
    receiverId: directMessage.receiverId,
    receiverName: receiver.name,
    message: directMessage.message,
    read: directMessage.read,
    createdAt: directMessage.createdAt
  }).from(directMessage).leftJoin(sender, eq(sender.id, directMessage.senderId)).leftJoin(receiver, eq(receiver.id, directMessage.receiverId)).where(
    or(
      eq(directMessage.senderId, sessionUser.id),
      eq(directMessage.receiverId, sessionUser.id)
    )
  ).orderBy(desc(directMessage.createdAt))).map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString()
  })), conversations = uniqueConversations(messages, sessionUser.id), users = await db.select({ id: user.id, name: user.name, image: user.image }).from(user).where(ne(user.id, sessionUser.id));
  return json2({ conversations, users, messages });
}
async function action2({ request }) {
  let session2 = await auth.api.getSession({ headers: request.headers });
  if (!session2?.user)
    return json2({ error: "Not authenticated" }, 401);
  let sessionUser = session2.user, fd = await request.formData(), receiverId = fd.get("receiverId"), body = fd.get("message");
  return !receiverId || !body?.trim() ? json2({ error: "Invalid message data" }, 400) : (await db.insert(directMessage).values({
    senderId: sessionUser.id,
    receiverId,
    message: body.trim(),
    read: !1,
    createdAt: /* @__PURE__ */ new Date()
  }), await db.update(directMessage).set({ read: !0 }).where(
    and(
      eq(directMessage.receiverId, sessionUser.id),
      eq(directMessage.senderId, receiverId),
      eq(directMessage.read, !1)
    )
  ), json2({ success: !0 }));
}
function MessagesPage() {
  let { conversations, users, messages } = useLoaderData(), { data: session2 } = useSession(), [selectedUserId, setSelectedUserId] = useState(null), [showNewMessage, setShowNewMessage] = useState(!1);
  if (!session2?.user)
    return /* @__PURE__ */ jsx6("div", { className: "p-4 text-center", children: "Please sign in to view messages" });
  let selectedUser = selectedUserId ? conversations.find((c) => c.id === selectedUserId) ?? users.find((u) => u.id === selectedUserId) : null, conversationMessages = selectedUserId ? messages.filter(
    (m) => m.senderId === session2.user.id && m.receiverId === selectedUserId || m.receiverId === session2.user.id && m.senderId === selectedUserId
  ) : [];
  return /* @__PURE__ */ jsx6("div", { className: "min-h-screen pb-20", children: selectedUser ? /* @__PURE__ */ jsxs3("div", { className: "flex flex-col h-screen", children: [
    /* @__PURE__ */ jsxs3("div", { className: "p-4 border-b flex items-center gap-2 bg-white sticky top-0 z-10", children: [
      /* @__PURE__ */ jsx6(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => setSelectedUserId(null),
          className: "p-0 w-8 h-8",
          children: /* @__PURE__ */ jsx6(ArrowLeft, {})
        }
      ),
      /* @__PURE__ */ jsx6("h2", { className: "font-bold text-lg", children: selectedUser.name })
    ] }),
    /* @__PURE__ */ jsx6("div", { className: "flex-1 overflow-y-auto p-4 flex flex-col gap-3", children: conversationMessages.length === 0 ? /* @__PURE__ */ jsx6("p", { className: "text-center text-gray-500 py-8", children: "No messages yet. Start the conversation!" }) : conversationMessages.map((m) => /* @__PURE__ */ jsxs3(
      "div",
      {
        className: `max-w-[80%] p-3 rounded-lg ${m.senderId === session2.user.id ? "bg-blue-500 text-white self-end rounded-br-none" : "bg-gray-200 self-start rounded-bl-none"}`,
        children: [
          /* @__PURE__ */ jsx6("p", { children: m.message }),
          /* @__PURE__ */ jsx6("p", { className: "text-xs opacity-70 mt-1", children: new Date(m.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }) })
        ]
      },
      m.id
    )) }),
    /* @__PURE__ */ jsxs3(Form, { method: "post", className: "p-4 border-t bg-white sticky bottom-16 z-10", children: [
      /* @__PURE__ */ jsx6("input", { type: "hidden", name: "receiverId", value: selectedUserId ?? "" }),
      /* @__PURE__ */ jsxs3("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx6(
          Input,
          {
            name: "message",
            placeholder: "Type a message...",
            className: "flex-1",
            required: !0,
            autoComplete: "off"
          }
        ),
        /* @__PURE__ */ jsx6(Button, { type: "submit", children: /* @__PURE__ */ jsx6(Send, { size: 18 }) })
      ] })
    ] })
  ] }) : showNewMessage ? /* @__PURE__ */ jsxs3("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsx6(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => setShowNewMessage(!1),
          className: "p-1",
          children: /* @__PURE__ */ jsx6(ArrowLeft, {})
        }
      ),
      /* @__PURE__ */ jsx6("h2", { className: "font-bold text-lg", children: "New Message" })
    ] }),
    /* @__PURE__ */ jsx6("div", { className: "space-y-1", children: users.map((u) => /* @__PURE__ */ jsxs3(
      Button,
      {
        variant: "ghost",
        className: "w-full justify-start p-4 h-auto",
        onClick: () => {
          setSelectedUserId(u.id), setShowNewMessage(!1);
        },
        children: [
          /* @__PURE__ */ jsx6("div", { className: "w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold mr-3", children: u.image ? /* @__PURE__ */ jsx6(
            "img",
            {
              src: u.image,
              alt: u.name || "",
              className: "w-full h-full object-cover rounded-full"
            }
          ) : (u.name || "U").charAt(0).toUpperCase() }),
          /* @__PURE__ */ jsx6("span", { children: u.name })
        ]
      },
      u.id
    )) })
  ] }) : /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsxs3("div", { className: "p-4 border-b bg-white sticky top-0 z-10 flex justify-between items-center", children: [
      /* @__PURE__ */ jsx6("h1", { className: "text-lg font-bold", children: "Messages" }),
      /* @__PURE__ */ jsxs3(Button, { onClick: () => setShowNewMessage(!0), children: [
        /* @__PURE__ */ jsx6(Plus, { size: 16, className: "mr-1" }),
        "New"
      ] })
    ] }),
    /* @__PURE__ */ jsx6("div", { className: "divide-y", children: conversations.length === 0 ? /* @__PURE__ */ jsxs3("div", { className: "py-12 text-center text-gray-500", children: [
      /* @__PURE__ */ jsx6("p", { className: "mb-4", children: "No conversations yet" }),
      /* @__PURE__ */ jsx6(Button, { onClick: () => setShowNewMessage(!0), children: "Start a new conversation" })
    ] }) : conversations.map((c) => /* @__PURE__ */ jsxs3(
      "button",
      {
        className: "w-full p-4 flex items-start gap-3 text-left",
        onClick: () => setSelectedUserId(c.id),
        children: [
          /* @__PURE__ */ jsx6("div", { className: "w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold", children: (c.name || "U").charAt(0).toUpperCase() }),
          /* @__PURE__ */ jsxs3("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs3("div", { className: "flex justify-between items-baseline", children: [
              /* @__PURE__ */ jsx6("h3", { className: "font-bold truncate", children: c.name }),
              /* @__PURE__ */ jsx6("span", { className: "text-xs text-gray-500", children: new Date(c.lastMessageTime).toLocaleDateString() })
            ] }),
            /* @__PURE__ */ jsx6("p", { className: "text-sm text-gray-600 truncate", children: c.lastMessage })
          ] }),
          c.unreadCount > 0 && /* @__PURE__ */ jsx6("div", { className: "w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center", children: c.unreadCount })
        ]
      },
      c.id
    )) })
  ] }) });
}

// src/routes/profile.tsx
var profile_exports = {};
__export(profile_exports, {
  action: () => action3,
  default: () => ProfilePage,
  loader: () => loader4
});
import { json as json3, redirect as redirect2 } from "@remix-run/node";
import { useLoaderData as useLoaderData2, Form as Form2 } from "@remix-run/react";
import { eq as eq2, desc as desc2 } from "drizzle-orm";

// src/components/ui/textarea.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx7(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/dialog.tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx8(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx8(DialogPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx8(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx8(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs4(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx8(DialogOverlay, {}),
    /* @__PURE__ */ jsxs4(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs4(DialogPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", children: [
            /* @__PURE__ */ jsx8(XIcon, {}),
            /* @__PURE__ */ jsx8("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx8(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx8(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}

// src/utils/uploadthing.ts
import { generateUploadButton } from "@uploadthing/react";
var UploadButton = generateUploadButton();

// src/components/UploadModal.tsx
import { useState as useState2 } from "react";
import { UploadCloud, Plus as Plus2 } from "lucide-react";
import { jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
function UploadModal({ trigger }) {
  let [open, setOpen] = useState2(!1), [title, setTitle] = useState2(""), [uploading, setUploading] = useState2(!1), { data: session2 } = useSession();
  return /* @__PURE__ */ jsxs5(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx9(DialogTrigger, { asChild: !0, children: trigger }),
    /* @__PURE__ */ jsxs5(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsx9(DialogHeader, { children: /* @__PURE__ */ jsx9(DialogTitle, { className: "text-center", children: "Upload a video" }) }),
      session2?.user ? /* @__PURE__ */ jsxs5("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs5("div", { children: [
          /* @__PURE__ */ jsx9("label", { className: "block text-sm font-medium mb-1", children: "Video Title" }),
          /* @__PURE__ */ jsx9(
            Input,
            {
              value: title,
              onChange: (e) => setTitle(e.target.value),
              placeholder: "Enter a title for your video"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs5("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center gap-4 text-slate-600", children: [
          /* @__PURE__ */ jsx9(UploadCloud, { className: "w-10 h-10" }),
          /* @__PURE__ */ jsx9(
            UploadButton,
            {
              endpoint: "videoUploader",
              input: { userId: session2.user.id },
              disabled: !title.trim() || uploading,
              className: "ut-button:bg-blue-600 ut-button:hover:bg-blue-700 ut-button:text-white ut-button:disabled:bg-gray-400",
              onBeforeUploadBegin: () => (sessionStorage.setItem("videoTitle", title.trim()), []),
              onUploadBegin: () => {
                setUploading(!0);
              },
              onClientUploadComplete: () => {
                setUploading(!1), setOpen(!1), sessionStorage.removeItem("videoTitle"), window.location.reload();
              },
              onUploadError: (error) => {
                setUploading(!1), alert(`Upload failed: ${error.message}`);
              }
            }
          ),
          /* @__PURE__ */ jsx9("p", { className: "text-xs text-gray-500", children: "MP4 \u2022 max 128 MB" })
        ] })
      ] }) : /* @__PURE__ */ jsx9("p", { className: "text-sm text-center text-red-600", children: "Please sign in first." }),
      /* @__PURE__ */ jsx9(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "mx-auto mt-4",
          onClick: () => setOpen(!1),
          children: "Close"
        }
      )
    ] })
  ] });
}
function ProfileUploadButton() {
  return /* @__PURE__ */ jsx9(
    UploadModal,
    {
      trigger: /* @__PURE__ */ jsxs5(Button, { size: "sm", variant: "default", className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx9(Plus2, { size: 16 }),
        /* @__PURE__ */ jsx9("span", { children: "Upload" })
      ] })
    }
  );
}

// src/components/ui/tabs.tsx
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { jsx as jsx10 } from "react/jsx-runtime";
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx10(
    TabsPrimitive.Root,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx10(
    TabsPrimitive.List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx10(
    TabsPrimitive.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx10(
    TabsPrimitive.Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}

// src/routes/profile.tsx
import { jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
async function loader4({ request }) {
  let session2 = await auth.api.getSession({ headers: request.headers });
  if (!session2?.user)
    return redirect2("/login");
  let profileRow = await db.select().from(user).where(eq2(user.id, session2.user.id)).then((rows) => rows[0]), videos = await db.select({
    id: video.id,
    url: video.url,
    title: video.title,
    thumbsUp: video.thumbsUp,
    thumbsDown: video.thumbsDown,
    createdAt: video.createdAt,
    userId: video.userId
  }).from(video).where(eq2(video.userId, session2.user.id)).orderBy(desc2(video.createdAt));
  return json3({
    profile: {
      ...profileRow,
      createdAt: profileRow.createdAt.toISOString(),
      updatedAt: profileRow.updatedAt.toISOString()
    },
    videos: videos.map((v) => ({
      ...v,
      createdAt: v.createdAt.toISOString()
    }))
  });
}
async function action3({ request }) {
  let session2 = await auth.api.getSession({ headers: request.headers });
  if (!session2?.user)
    return redirect2("/login");
  let fd = await request.formData(), updates = {
    updatedAt: /* @__PURE__ */ new Date()
  }, setIfProvided = (field) => {
    let val = fd.get(field);
    val !== null && String(val).trim() !== "" && (updates[field] = String(val));
  };
  return setIfProvided("name"), setIfProvided("bio"), setIfProvided("location"), setIfProvided("username"), Object.keys(updates).length > 1 && await db.update(user).set(updates).where(eq2(user.id, session2.user.id)), redirect2("/profile");
}
function ProfilePage() {
  let { profile, videos } = useLoaderData2();
  return /* @__PURE__ */ jsxs6("div", { className: "min-h-screen pb-20", children: [
    /* @__PURE__ */ jsxs6("div", { className: "bg-gradient-to-b from-blue-600 to-blue-500 text-white pt-12 pb-8 px-4", children: [
      /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx11("div", { className: "w-20 h-20 rounded-full bg-white overflow-hidden flex items-center justify-center", children: profile.image ? /* @__PURE__ */ jsx11(
          "img",
          {
            src: profile.image,
            alt: profile.name,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsx11("div", { className: "w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 text-2xl font-bold", children: profile.name.charAt(0).toUpperCase() }) }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx11("h1", { className: "text-2xl font-bold", children: profile.name }),
          /* @__PURE__ */ jsx11("p", { className: "text-sm opacity-80", children: profile.username ? `@${profile.username}` : profile.email }),
          profile.location && /* @__PURE__ */ jsx11("p", { className: "text-sm mt-1", children: profile.location })
        ] })
      ] }),
      profile.bio && /* @__PURE__ */ jsx11("p", { className: "text-sm opacity-90 mt-4", children: profile.bio }),
      /* @__PURE__ */ jsxs6("div", { className: "mt-6 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx11("p", { className: "text-xl font-bold", children: videos.length }),
          /* @__PURE__ */ jsx11("p", { className: "text-xs opacity-80", children: "Videos" })
        ] }),
        /* @__PURE__ */ jsx11(ProfileUploadButton, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxs6(Tabs, { defaultValue: "videos", className: "w-full", children: [
      /* @__PURE__ */ jsxs6(TabsList, { className: "w-full grid grid-cols-2", children: [
        /* @__PURE__ */ jsx11(TabsTrigger, { value: "videos", children: "My Videos" }),
        /* @__PURE__ */ jsx11(TabsTrigger, { value: "edit", children: "Edit Profile" })
      ] }),
      /* @__PURE__ */ jsx11(TabsContent, { value: "videos", className: "p-4", children: videos.length === 0 ? /* @__PURE__ */ jsxs6("div", { className: "py-10 text-center text-gray-500", children: [
        /* @__PURE__ */ jsx11("p", { children: "You haven't uploaded any videos yet." }),
        /* @__PURE__ */ jsx11(ProfileUploadButton, {})
      ] }) : /* @__PURE__ */ jsx11("div", { className: "grid grid-cols-3 gap-2", children: videos.map((v) => /* @__PURE__ */ jsxs6(
        "div",
        {
          className: "aspect-square relative overflow-hidden rounded-md bg-gray-100",
          children: [
            /* @__PURE__ */ jsx11(
              "video",
              {
                src: v.url,
                className: "absolute inset-0 w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxs6("div", { className: "absolute bottom-1 right-1 bg-black/50 text-white text-xs px-1 rounded", children: [
              v.thumbsUp,
              " \u{1F44D}"
            ] }),
            v.title && /* @__PURE__ */ jsx11("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2", children: /* @__PURE__ */ jsx11("p", { className: "text-white text-xs truncate", children: v.title }) })
          ]
        },
        v.id
      )) }) }),
      /* @__PURE__ */ jsxs6(TabsContent, { value: "edit", className: "p-4", children: [
        /* @__PURE__ */ jsxs6(Form2, { method: "post", className: "space-y-4", children: [
          /* @__PURE__ */ jsxs6("div", { children: [
            /* @__PURE__ */ jsx11("label", { className: "block text-sm font-medium mb-1", children: "Name" }),
            /* @__PURE__ */ jsx11(Input, { name: "name", defaultValue: profile.name })
          ] }),
          /* @__PURE__ */ jsxs6("div", { children: [
            /* @__PURE__ */ jsx11("label", { className: "block text-sm font-medium mb-1", children: "Username" }),
            /* @__PURE__ */ jsx11(
              Input,
              {
                name: "username",
                defaultValue: profile.username || "",
                placeholder: "username"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs6("div", { children: [
            /* @__PURE__ */ jsx11("label", { className: "block text-sm font-medium mb-1", children: "Bio" }),
            /* @__PURE__ */ jsx11(
              Textarea,
              {
                name: "bio",
                defaultValue: profile.bio || "",
                rows: 3,
                placeholder: "Tell us about yourself"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs6("div", { children: [
            /* @__PURE__ */ jsx11("label", { className: "block text-sm font-medium mb-1", children: "Location" }),
            /* @__PURE__ */ jsx11(
              Input,
              {
                name: "location",
                defaultValue: profile.location || "",
                placeholder: "City, Country"
              }
            )
          ] }),
          /* @__PURE__ */ jsx11(Button, { type: "submit", className: "w-full", children: "Save Profile" })
        ] }),
        /* @__PURE__ */ jsx11(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "w-full mt-4 text-red-500 border-red-200",
            onClick: () => signOut(),
            children: "Sign Out"
          }
        )
      ] })
    ] })
  ] });
}

// src/routes/signup.tsx
var signup_exports = {};
__export(signup_exports, {
  default: () => SignUp
});
import { useState as useState3 } from "react";
import { jsx as jsx12, jsxs as jsxs7 } from "react/jsx-runtime";
function SignUp() {
  let [name, setName] = useState3(""), [email, setEmail] = useState3(""), [password, setPassword] = useState3(""), [error, setError] = useState3(null);
  async function handleSubmit(e) {
    e.preventDefault(), setError(null), await signUp.email(
      { name, email, password },
      {
        onSuccess() {
          window.location.href = "/";
        },
        onError(ctx) {
          setError(ctx.error?.message ?? "Unknown error");
        }
      }
    );
  }
  return /* @__PURE__ */ jsxs7("div", { className: "p-6 max-w-sm mx-auto", children: [
    /* @__PURE__ */ jsx12("h1", { className: "text-2xl font-bold mb-4", children: "Create\xA0Account" }),
    /* @__PURE__ */ jsxs7("form", { onSubmit: handleSubmit, className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsx12(
        "input",
        {
          type: "text",
          className: "w-full px-3 py-2 border rounded",
          placeholder: "Name",
          value: name,
          onChange: (e) => setName(e.target.value),
          required: !0
        }
      ),
      /* @__PURE__ */ jsx12(
        "input",
        {
          type: "email",
          className: "w-full px-3 py-2 border rounded",
          placeholder: "Email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: !0
        }
      ),
      /* @__PURE__ */ jsx12(
        "input",
        {
          type: "password",
          className: "w-full px-3 py-2 border rounded",
          placeholder: "Password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: !0
        }
      ),
      error && /* @__PURE__ */ jsx12("p", { className: "text-red-600 text-sm", children: error }),
      /* @__PURE__ */ jsx12(
        "button",
        {
          type: "submit",
          className: "w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded",
          children: "Sign\xA0up"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs7("p", { className: "text-sm mt-4 text-center", children: [
      "Already have an account?\xA0",
      /* @__PURE__ */ jsx12("a", { href: "/login", className: "text-blue-600 underline", children: "Log in" })
    ] })
  ] });
}

// src/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  action: () => action4,
  default: () => Home2,
  loader: () => loader5
});
import { json as json4, redirect as redirect3 } from "@remix-run/node";
import { useLoaderData as useLoaderData3 } from "@remix-run/react";
import { desc as desc3, eq as eq3, inArray } from "drizzle-orm";
import { sql as sql3 } from "drizzle-orm/sql";

// src/components/VideoPlayer.tsx
import { useRef, useEffect, useState as useState4 } from "react";
import { useFetcher } from "@remix-run/react";
import { MessageSquare as MessageSquare2, ThumbsUp, ThumbsDown } from "lucide-react";

// src/components/ui/drawer.tsx
import { Drawer as DrawerPrimitive } from "vaul";
import { jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
function Drawer({
  ...props
}) {
  return /* @__PURE__ */ jsx13(DrawerPrimitive.Root, { "data-slot": "drawer", ...props });
}
function DrawerPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx13(DrawerPrimitive.Portal, { "data-slot": "drawer-portal", ...props });
}
function DrawerClose({
  ...props
}) {
  return /* @__PURE__ */ jsx13(DrawerPrimitive.Close, { "data-slot": "drawer-close", ...props });
}
function DrawerOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx13(
    DrawerPrimitive.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DrawerContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs8(DrawerPortal, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ jsx13(DrawerOverlay, {}),
    /* @__PURE__ */ jsxs8(
      DrawerPrimitive.Content,
      {
        "data-slot": "drawer-content",
        className: cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx13("div", { className: "bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" }),
          children
        ]
      }
    )
  ] });
}
function DrawerHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx13(
    "div",
    {
      "data-slot": "drawer-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function DrawerFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx13(
    "div",
    {
      "data-slot": "drawer-footer",
      className: cn("mt-auto flex flex-col gap-2 p-4", className),
      ...props
    }
  );
}
function DrawerTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx13(
    DrawerPrimitive.Title,
    {
      "data-slot": "drawer-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function DrawerDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx13(
    DrawerPrimitive.Description,
    {
      "data-slot": "drawer-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}

// src/components/VideoPlayer.tsx
import { Form as Form3 } from "@remix-run/react";
import { jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
function VideoPlayer({
  videos,
  sessionUserId,
  initialIndex = 0
}) {
  let [currentIndex, setCurrentIndex] = useState4(initialIndex), [isPlaying, setIsPlaying] = useState4(!1), [isDrawerOpen, setIsDrawerOpen] = useState4(!1), [userLiked, setUserLiked] = useState4({}), videoRefs = useRef({}), containerRef = useRef(null), touchStartY = useRef(null), touchEndY = useRef(null), touchStartTime = useRef(null), lastTapTime = useRef(0), isAnimating = useRef(!1), fetcher = useFetcher(), currentVideo = videos[currentIndex], prevIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1, nextIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1, handleTouchStart = (e) => {
    if (isAnimating.current)
      return;
    touchStartY.current = e.touches[0].clientY, touchStartTime.current = Date.now();
    let now = Date.now();
    now - lastTapTime.current < 300 && handleDoubleTap(), lastTapTime.current = now;
  }, handleDoubleTap = () => {
    if (!(!currentVideo || !sessionUserId) && !userLiked[currentVideo.id]) {
      fetcher.submit(
        {
          _t: "vote",
          videoId: currentVideo.id.toString(),
          dir: "up"
        },
        { method: "post" }
      );
      let heartElement = document.createElement("div");
      heartElement.className = "heart-animation", heartElement.innerHTML = "\u2764\uFE0F", containerRef.current?.appendChild(heartElement), setTimeout(() => {
        containerRef.current?.contains(heartElement) && containerRef.current?.removeChild(heartElement);
      }, 1e3), setUserLiked((prev) => ({ ...prev, [currentVideo.id]: !0 }));
    }
  }, handleTouchMove = (e) => {
    isAnimating.current || touchStartY.current === null || (touchEndY.current = e.touches[0].clientY);
  }, handleTouchEnd = () => {
    if (isAnimating.current || touchStartY.current === null || touchEndY.current === null) {
      touchStartY.current = null, touchEndY.current = null, touchStartTime.current = null;
      return;
    }
    let yDiff = touchStartY.current - touchEndY.current;
    Math.abs(yDiff) > 50 && (yDiff > 0 ? handleVideoChange(nextIndex) : handleVideoChange(prevIndex)), touchStartY.current = null, touchEndY.current = null, touchStartTime.current = null;
  }, handleVideoChange = (index2) => {
    if (isAnimating.current)
      return;
    isAnimating.current = !0, videoRefs.current[currentIndex] && videoRefs.current[currentIndex].pause();
    let containerElement = containerRef.current;
    if (containerElement) {
      let direction = index2 > currentIndex ? "up" : "down";
      currentIndex === videos.length - 1 && index2 === 0 || currentIndex === 0 && videos.length - 1, containerElement.classList.add(`slide-${direction}`), setTimeout(() => {
        setCurrentIndex(index2), containerElement.classList.remove("slide-up", "slide-down"), isAnimating.current = !1;
        let newVideoElement = videoRefs.current[index2];
        newVideoElement && newVideoElement.play().then(() => setIsPlaying(!0)).catch((error) => console.error("Autoplay prevented:", error));
      }, 300);
    } else
      setCurrentIndex(index2), isAnimating.current = !1;
  }, togglePlayPause = () => {
    let videoElement = videoRefs.current[currentIndex];
    videoElement && (videoElement.paused ? videoElement.play().then(() => setIsPlaying(!0)).catch(console.error) : (videoElement.pause(), setIsPlaying(!1)));
  };
  return useEffect(() => {
    let videoElement = videoRefs.current[currentIndex];
    videoElement && videoElement.play().then(() => setIsPlaying(!0)).catch((error) => console.error("Autoplay prevented:", error));
    let styleElement = document.createElement("style");
    return styleElement.textContent = `
      .video-container {
        position: relative;
        transition: transform 0.3s cubic-bezier(0.65, 0, 0.35, 1);
      }
      .slide-up {
        transform: translateY(-100%);
      }
      .slide-down {
        transform: translateY(100%);
      }
      .video-element {
        transition: opacity 0.2s ease;
      }
      .heart-animation {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 100px;
        animation: heart-grow 1s forwards;
        pointer-events: none;
        z-index: 100;
      }
      @keyframes heart-grow {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
      }
    `, document.head.appendChild(styleElement), () => {
      document.head.contains(styleElement) && document.head.removeChild(styleElement);
    };
  }, [currentIndex]), !currentVideo || videos.length === 0 ? /* @__PURE__ */ jsx14("div", { className: "flex items-center justify-center h-screen", children: "No videos available" }) : /* @__PURE__ */ jsxs9(
    "div",
    {
      className: "h-screen w-full relative bg-black overflow-hidden",
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      children: [
        /* @__PURE__ */ jsxs9(
          "div",
          {
            ref: containerRef,
            className: "video-container h-full w-full",
            children: [
              videos.map((video2, index2) => /* @__PURE__ */ jsxs9(
                "div",
                {
                  className: `absolute inset-0 h-full w-full ${index2 === currentIndex ? "z-10" : "z-0 opacity-0"}`,
                  children: [
                    /* @__PURE__ */ jsx14(
                      "video",
                      {
                        ref: (el) => {
                          videoRefs.current[index2] = el;
                        },
                        src: video2.url,
                        className: "h-full w-full object-contain video-element",
                        loop: !0,
                        playsInline: !0,
                        preload: index2 === currentIndex || index2 === prevIndex || index2 === nextIndex ? "auto" : "none",
                        onClick: togglePlayPause
                      }
                    ),
                    index2 === currentIndex && /* @__PURE__ */ jsxs9("div", { className: "absolute bottom-20 left-4 right-16 z-20 text-white", children: [
                      /* @__PURE__ */ jsx14("p", { className: "font-bold text-lg", children: video2.title || `@${video2.authorName || "user"}` }),
                      /* @__PURE__ */ jsx14("p", { className: "text-sm opacity-80", children: new Date(video2.createdAt).toLocaleDateString(void 0, {
                        month: "short",
                        day: "numeric"
                      }) })
                    ] })
                  ]
                },
                video2.id
              )),
              !isPlaying && /* @__PURE__ */ jsx14("div", { className: "absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-30", children: /* @__PURE__ */ jsx14("div", { className: "w-16 h-16 rounded-full bg-white bg-opacity-30 flex items-center justify-center", children: /* @__PURE__ */ jsx14("div", { className: "w-12 h-12 rounded-full bg-white flex items-center justify-center", children: "\u25B6\uFE0F" }) }) }),
              /* @__PURE__ */ jsx14("div", { className: "absolute right-4 bottom-32 flex flex-col gap-6 z-20", children: /* @__PURE__ */ jsxs9(fetcher.Form, { method: "post", className: "flex flex-col gap-6", children: [
                /* @__PURE__ */ jsx14("input", { type: "hidden", name: "_t", value: "vote" }),
                /* @__PURE__ */ jsx14("input", { type: "hidden", name: "videoId", value: currentVideo.id }),
                /* @__PURE__ */ jsxs9(
                  Button,
                  {
                    size: "icon",
                    variant: "ghost",
                    name: "dir",
                    value: "up",
                    "aria-label": "thumb up",
                    className: `text-white bg-transparent hover:bg-white/20 rounded-full w-12 h-12 flex flex-col items-center ${userLiked[currentVideo.id] ? "text-red-500" : ""}`,
                    onClick: (e) => {
                      e.stopPropagation(), userLiked[currentVideo.id] || setUserLiked((prev) => ({ ...prev, [currentVideo.id]: !0 }));
                    },
                    disabled: userLiked[currentVideo.id],
                    children: [
                      /* @__PURE__ */ jsx14(ThumbsUp, { className: "w-6 h-6" }),
                      /* @__PURE__ */ jsx14("span", { className: "text-xs mt-1", children: userLiked[currentVideo.id] ? currentVideo.thumbsUp + 1 : currentVideo.thumbsUp })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs9(
                  Button,
                  {
                    size: "icon",
                    variant: "ghost",
                    name: "dir",
                    value: "down",
                    "aria-label": "thumb down",
                    className: "text-white bg-transparent hover:bg-white/20 rounded-full w-12 h-12 flex flex-col items-center",
                    onClick: (e) => e.stopPropagation(),
                    children: [
                      /* @__PURE__ */ jsx14(ThumbsDown, { className: "w-6 h-6" }),
                      /* @__PURE__ */ jsx14("span", { className: "text-xs mt-1", children: currentVideo.thumbsDown })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs9(
                  Button,
                  {
                    variant: "ghost",
                    className: "text-white bg-transparent hover:bg-white/20 rounded-full w-12 h-12 flex flex-col items-center",
                    onClick: (e) => {
                      e.stopPropagation(), setIsDrawerOpen(!0);
                    },
                    children: [
                      /* @__PURE__ */ jsx14(MessageSquare2, { className: "w-6 h-6" }),
                      /* @__PURE__ */ jsx14("span", { className: "text-xs mt-1", children: currentVideo.comments.length })
                    ]
                  }
                )
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx14(Drawer, { open: isDrawerOpen, onOpenChange: setIsDrawerOpen, children: /* @__PURE__ */ jsxs9(DrawerContent, { className: "max-h-[80vh]", children: [
          /* @__PURE__ */ jsxs9(DrawerHeader, { children: [
            /* @__PURE__ */ jsx14(DrawerTitle, { children: "Comments" }),
            /* @__PURE__ */ jsx14(DrawerDescription, { children: currentVideo.comments.length === 0 ? "No comments yet" : `${currentVideo.comments.length} comments` })
          ] }),
          /* @__PURE__ */ jsx14("div", { className: "px-4 overflow-y-auto max-h-[50vh]", children: currentVideo.comments.length === 0 ? /* @__PURE__ */ jsx14("p", { className: "py-4 text-center text-gray-500", children: "Be the first to comment" }) : currentVideo.comments.map((comment) => /* @__PURE__ */ jsxs9("div", { className: "border-b py-3", children: [
            /* @__PURE__ */ jsx14("p", { className: "font-semibold", children: comment.authorName }),
            /* @__PURE__ */ jsx14("p", { children: comment.body })
          ] }, comment.id)) }),
          sessionUserId && /* @__PURE__ */ jsx14(DrawerFooter, { children: /* @__PURE__ */ jsxs9(
            Form3,
            {
              method: "post",
              className: "flex gap-2",
              children: [
                /* @__PURE__ */ jsx14("input", { type: "hidden", name: "_t", value: "comment" }),
                /* @__PURE__ */ jsx14("input", { type: "hidden", name: "videoId", value: currentVideo.id }),
                /* @__PURE__ */ jsx14("input", { type: "hidden", name: "userId", value: sessionUserId }),
                /* @__PURE__ */ jsx14(
                  Input,
                  {
                    name: "body",
                    required: !0,
                    placeholder: "Add a comment\u2026",
                    className: "flex-1"
                  }
                ),
                /* @__PURE__ */ jsx14(Button, { type: "submit", children: "Send" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx14(DrawerClose, {})
        ] }) })
      ]
    }
  );
}

// src/routes/_index.tsx
import { jsx as jsx15, jsxs as jsxs10 } from "react/jsx-runtime";
async function loader5({}) {
  let vids = await db.select({
    id: video.id,
    url: video.url,
    title: video.title,
    thumbsUp: video.thumbsUp,
    thumbsDown: video.thumbsDown,
    authorName: user.name,
    userId: video.userId,
    createdAt: video.createdAt
  }).from(video).leftJoin(user, eq3(video.userId, user.id)).orderBy(desc3(video.createdAt));
  if (console.log("[loader] video rows \u2192", vids.length), vids.length === 0)
    return json4({ videos: [] });
  let ids = vids.map((v) => v.id), cmts = await db.select({
    id: videoComment.id,
    videoId: videoComment.videoId,
    body: videoComment.body,
    authorName: user.name
  }).from(videoComment).leftJoin(user, eq3(videoComment.userId, user.id)).where(inArray(videoComment.videoId, ids));
  console.log("[loader] comment rows \u2192", cmts.length);
  let byVideo = {};
  for (let c of cmts)
    (byVideo[c.videoId] ||= []).push(c);
  let data = vids.map((v) => ({
    ...v,
    createdAt: v.createdAt.toISOString(),
    comments: byVideo[v.id] ?? []
  }));
  return json4({ videos: data });
}
async function action4({ request }) {
  let fd = await request.formData(), type = fd.get("_t");
  if (type === "vote") {
    let id = Number(fd.get("videoId"));
    return await db.execute(
      sql3`
        update "video"
        set ${fd.get("dir") === "up" ? sql3`"thumbs_up" = "thumbs_up" + 1` : sql3`"thumbs_down" = "thumbs_down" + 1`}
        where "id" = ${id}
      `
    ), json4({ ok: !0 });
  }
  if (type === "comment") {
    let id = Number(fd.get("videoId")), userId = String(fd.get("userId")), body = String(fd.get("body"));
    return await db.insert(videoComment).values({ videoId: id, userId, body }), redirect3(request.headers.get("Referer") ?? "/");
  }
  return json4({ ok: !1 }, 400);
}
function Home2() {
  let { videos } = useLoaderData3(), { data: session2 } = useSession();
  return videos.length === 0 ? /* @__PURE__ */ jsxs10("div", { className: "h-screen flex flex-col items-center justify-center p-6 text-center text-slate-600 bg-black text-white", children: [
    /* @__PURE__ */ jsx15("p", { className: "mb-4", children: "No videos yet." }),
    /* @__PURE__ */ jsx15("p", { children: "Head to your profile to upload videos." })
  ] }) : /* @__PURE__ */ jsx15("div", { className: "h-screen bg-black", children: /* @__PURE__ */ jsx15(
    VideoPlayer,
    {
      videos,
      sessionUserId: session2?.user?.id ?? null
    }
  ) });
}

// src/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  default: () => Login
});
import { useState as useState5 } from "react";
import { jsx as jsx16, jsxs as jsxs11 } from "react/jsx-runtime";
function Login() {
  let [email, setEmail] = useState5(""), [password, setPassword] = useState5(""), [error, setError] = useState5(null);
  async function handleSubmit(e) {
    e.preventDefault(), setError(null), await signIn.email(
      { email, password },
      {
        onSuccess() {
          window.location.href = "/";
        },
        onError(ctx) {
          setError(ctx.error?.message ?? "Unknown error");
        }
      }
    );
  }
  return /* @__PURE__ */ jsxs11("div", { className: "p-6 max-w-sm mx-auto", children: [
    /* @__PURE__ */ jsx16("h1", { className: "text-2xl font-bold mb-4", children: "Log\xA0in" }),
    /* @__PURE__ */ jsxs11("form", { onSubmit: handleSubmit, className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsx16(
        "input",
        {
          type: "email",
          className: "w-full px-3 py-2 border rounded",
          placeholder: "Email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: !0
        }
      ),
      /* @__PURE__ */ jsx16(
        "input",
        {
          type: "password",
          className: "w-full px-3 py-2 border rounded",
          placeholder: "Password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: !0
        }
      ),
      error && /* @__PURE__ */ jsx16("p", { className: "text-red-600 text-sm", children: error }),
      /* @__PURE__ */ jsx16(
        "button",
        {
          type: "submit",
          className: "w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded",
          children: "Sign\xA0in"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs11("p", { className: "text-sm mt-4 text-center", children: [
      "New here?\xA0",
      /* @__PURE__ */ jsx16("a", { href: "/signup", className: "text-blue-600 underline", children: "Create an account" })
    ] })
  ] });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-QLZZ37KL.js", imports: ["/build/_shared/chunk-25BYIYGU.js", "/build/_shared/chunk-2Z2BTQU4.js", "/build/_shared/chunk-ZT4QWOFN.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-7T5FFC65.js", imports: ["/build/_shared/chunk-B7FGBX3E.js", "/build/_shared/chunk-WQPAJ64N.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-LA2TFB5T.js", imports: ["/build/_shared/chunk-MM4ZZK5Z.js", "/build/_shared/chunk-OIX5OCDU.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.auth.$": { id: "routes/api.auth.$", parentId: "root", path: "api/auth/*", index: void 0, caseSensitive: void 0, module: "/build/routes/api.auth.$-N3IS2CUU.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.uploadthing": { id: "routes/api.uploadthing", parentId: "root", path: "api/uploadthing", index: void 0, caseSensitive: void 0, module: "/build/routes/api.uploadthing-7FOHVSHP.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.videos": { id: "routes/api.videos", parentId: "root", path: "api/videos", index: void 0, caseSensitive: void 0, module: "/build/routes/api.videos-4QUWM57E.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-ZE3AN5MV.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/messages": { id: "routes/messages", parentId: "root", path: "messages", index: void 0, caseSensitive: void 0, module: "/build/routes/messages-PDFKMJ6D.js", imports: ["/build/_shared/chunk-H3RZE2CH.js", "/build/_shared/chunk-OIX5OCDU.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/profile": { id: "routes/profile", parentId: "root", path: "profile", index: void 0, caseSensitive: void 0, module: "/build/routes/profile-WXFGHKJS.js", imports: ["/build/_shared/chunk-MM4ZZK5Z.js", "/build/_shared/chunk-H3RZE2CH.js", "/build/_shared/chunk-OIX5OCDU.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/signup": { id: "routes/signup", parentId: "root", path: "signup", index: void 0, caseSensitive: void 0, module: "/build/routes/signup-RNFXUKK3.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "65e00531", hmr: void 0, url: "/build/manifest-65E00531.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/api.uploadthing": {
    id: "routes/api.uploadthing",
    parentId: "root",
    path: "api/uploadthing",
    index: void 0,
    caseSensitive: void 0,
    module: api_uploadthing_exports
  },
  "routes/api.auth.$": {
    id: "routes/api.auth.$",
    parentId: "root",
    path: "api/auth/*",
    index: void 0,
    caseSensitive: void 0,
    module: api_auth_exports
  },
  "routes/api.videos": {
    id: "routes/api.videos",
    parentId: "root",
    path: "api/videos",
    index: void 0,
    caseSensitive: void 0,
    module: api_videos_exports
  },
  "routes/messages": {
    id: "routes/messages",
    parentId: "root",
    path: "messages",
    index: void 0,
    caseSensitive: void 0,
    module: messages_exports
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "root",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: profile_exports
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: signup_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
