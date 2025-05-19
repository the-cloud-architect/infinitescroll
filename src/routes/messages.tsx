// src/routes/messages.tsx
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { useState } from "react";

import { db } from "@/db";
import { user, directMessage } from "@/db/schema";
import { eq, ne, or, and, desc, aliasedTable } from "drizzle-orm";

import { auth } from "@/lib/auth.server";
import { useSession } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Plus } from "lucide-react";

import type { MessageItem, ConversationPartner } from "@/types";

/** Aggregate a unique list of conversation partners */
function uniqueConversations(
  messages: MessageItem[],
  me: string,
): ConversationPartner[] {
  const map = new Map<string, ConversationPartner>();
  for (const m of messages) {
    const otherId   = m.senderId   === me ? m.receiverId : m.senderId;
    const otherName = m.senderId   === me ? m.receiverName : m.senderName;
    const entry = map.get(otherId) ?? {
      id: otherId,
      name: otherName,
      lastMessage: m.message,
      lastMessageTime: m.createdAt,
      unreadCount: m.senderId !== me && !m.read ? 1 : 0,
    };
    if (m.createdAt > entry.lastMessageTime) {
      entry.lastMessage     = m.message;
      entry.lastMessageTime = m.createdAt;
    }
    if (m.senderId !== me && !m.read) {
      entry.unreadCount += 1;
    }
    map.set(otherId, entry);
  }
  return Array.from(map.values());
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return redirect("/login");
  const sessionUser = session.user;

  // alias the user table twice for sender/receiver
  const sender   = aliasedTable(user, "sender");
  const receiver = aliasedTable(user, "receiver");

  const raw = await db
    .select({
      id:           directMessage.id,
      senderId:     directMessage.senderId,
      senderName:   sender.name,
      receiverId:   directMessage.receiverId,
      receiverName: receiver.name,
      message:      directMessage.message,
      read:         directMessage.read,
      createdAt:    directMessage.createdAt,
    })
    .from(directMessage)
    .leftJoin(sender,   eq(sender.id,   directMessage.senderId))
    .leftJoin(receiver, eq(receiver.id, directMessage.receiverId))
    .where(
      or(
        eq(directMessage.senderId,   sessionUser.id),
        eq(directMessage.receiverId, sessionUser.id),
      ),
    )
    .orderBy(desc(directMessage.createdAt));

  const messages: MessageItem[] = raw.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
  }));

  const conversations = uniqueConversations(messages, sessionUser.id);

  const users = await db
    .select({ id: user.id, name: user.name, image: user.image })
    .from(user)
    .where(ne(user.id, sessionUser.id));

  return json({ conversations, users, messages });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return json({ error: "Not authenticated" }, 401);
  const sessionUser = session.user;

  const fd         = await request.formData();
  const receiverId = fd.get("receiverId") as string | null;
  const body       = fd.get("message")    as string | null;
  if (!receiverId || !body?.trim()) {
    return json({ error: "Invalid message data" }, 400);
  }

  await db.insert(directMessage).values({
    senderId:  sessionUser.id,
    receiverId,
    message:   body.trim(),
    read:      false,
    createdAt: new Date(),
  });

  // mark partner's unread messages as read
  await db
    .update(directMessage)
    .set({ read: true })
    .where(
      and(
        eq(directMessage.receiverId, sessionUser.id),
        eq(directMessage.senderId,   receiverId),
        eq(directMessage.read,       false),
      ),
    );

  return json({ success: true });
}

export default function MessagesPage() {
  const { conversations, users, messages } = useLoaderData<typeof loader>();
  const { data: session }                  = useSession();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showNewMessage, setShowNewMessage] = useState(false);

  if (!session?.user) {
    return <div className="p-4 text-center">Please sign in to view messages</div>;
  }

  const selectedUser = selectedUserId
    ? conversations.find((c) => c.id === selectedUserId)
      ?? users.find((u) => u.id === selectedUserId)
    : null;

  const conversationMessages = selectedUserId
    ? messages.filter((m) =>
        (m.senderId   === session.user.id && m.receiverId === selectedUserId) ||
        (m.receiverId === session.user.id && m.senderId   === selectedUserId)
      )
    : [];

  return (
    <div className="min-h-screen pb-20">
      {selectedUser ? (
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="p-4 border-b flex items-center gap-2 bg-white sticky top-0 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedUserId(null)}
              className="p-0 w-8 h-8"
            >
              <ArrowLeft />
            </Button>
            <h2 className="font-bold text-lg">{selectedUser.name}</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {conversationMessages.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No messages yet. Start the conversation!
              </p>
            ) : (
              conversationMessages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[80%] p-3 rounded-lg ${
                    m.senderId === session.user.id
                      ? "bg-blue-500 text-white self-end rounded-br-none"
                      : "bg-gray-200 self-start rounded-bl-none"
                  }`}
                >
                  <p>{m.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(m.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <Form method="post" className="p-4 border-t bg-white sticky bottom-16 z-10">
            <input type="hidden" name="receiverId" value={selectedUserId ?? ""} />
            <div className="flex gap-2">
              <Input
                name="message"
                placeholder="Type a message..."
                className="flex-1"
                required
                autoComplete="off"
              />
              <Button type="submit">
                <Send size={18} />
              </Button>
            </div>
          </Form>
        </div>
      ) : showNewMessage ? (
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNewMessage(false)}
              className="p-1"
            >
              <ArrowLeft />
            </Button>
            <h2 className="font-bold text-lg">New Message</h2>
          </div>
          <div className="space-y-1">
            {users.map((u) => (
              <Button
                key={u.id}
                variant="ghost"
                className="w-full justify-start p-4 h-auto"
                onClick={() => {
                  setSelectedUserId(u.id);
                  setShowNewMessage(false);
                }}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold mr-3">
                  {u.image ? (
                    <img
                      src={u.image}
                      alt={u.name || ""}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    (u.name || "U").charAt(0).toUpperCase()
                  )}
                </div>
                <span>{u.name}</span>
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Conversations List */}
          <div className="p-4 border-b bg-white sticky top-0 z-10 flex justify-between items-center">
            <h1 className="text-lg font-bold">Messages</h1>
            <Button onClick={() => setShowNewMessage(true)}>
              <Plus size={16} className="mr-1" />
              New
            </Button>
          </div>
          <div className="divide-y">
            {conversations.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <p className="mb-4">No conversations yet</p>
                <Button onClick={() => setShowNewMessage(true)}>
                  Start a new conversation
                </Button>
              </div>
            ) : (
              conversations.map((c) => (
                <button
                  key={c.id}
                  className="w-full p-4 flex items-start gap-3 text-left"
                  onClick={() => setSelectedUserId(c.id)}
                >
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold">
                    {(c.name || "U").charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold truncate">{c.name}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(c.lastMessageTime).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {c.lastMessage}
                    </p>
                  </div>
                  {c.unreadCount > 0 && (
                    <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                      {c.unreadCount}
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
