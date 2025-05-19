import { useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Form, useFetcher } from "@remix-run/react";
import type { ChangeEvent } from "react";

/* ---------- types ---------- */
export interface CommentRow {
  id: number;
  videoId: number;
  body: string;
  authorName: string | null;
}
export interface VideoItem {
  id: number;
  url: string;
  thumbsUp: number;
  thumbsDown: number;
  authorName: string | null;
  userId: string;
  createdAt: string;
  comments: CommentRow[];
}

export function VideoGrid({
  videos,
  sessionUserId,
}: {
  videos: VideoItem[];
  sessionUserId: string | null;
}) {
  useEffect(() => {
    console.log("[VideoGrid] videos from loader →", videos);
  }, [videos]);

  if (videos.length === 0) {
    return (
      <p className="p-6 text-center text-slate-600">
        No videos yet. Upload something!
      </p>
    );
  }

  const fetcher = useFetcher();

  return (
    <div className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((v) => {
        const when = new Date(v.createdAt).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        });

        return (
          <article
            key={v.id}
            className="rounded-lg shadow bg-white flex flex-col overflow-hidden"
          >
            <video controls src={v.url} className="w-full aspect-video" />

            <div className="p-4 flex flex-col flex-1">
              <p className="text-sm text-slate-600 mb-2">
                <b>{v.authorName ?? v.userId}</b> • {when}
              </p>

              {/* votes */}
              <fetcher.Form method="post" className="flex gap-4 mb-4">
                <input type="hidden" name="_t" value="vote" />
                <input type="hidden" name="videoId" value={v.id} />

                <Button
                  size="icon"
                  variant="ghost"
                  name="dir"
                  value="up"
                  aria-label="thumb up"
                >
                  👍 {v.thumbsUp}
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  name="dir"
                  value="down"
                  aria-label="thumb down"
                >
                  👎 {v.thumbsDown}
                </Button>
              </fetcher.Form>

              {/* comments */}
              <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
                {v.comments.map((c) => (
                  <p key={c.id} className="text-sm">
                    <b>{c.authorName}:</b> {c.body}
                  </p>
                ))}
              </div>

              {sessionUserId && (
                <Form
                  method="post"
                  className="mt-3 flex gap-2 items-center"
                  onChange={(e: ChangeEvent<HTMLFormElement>) =>
                    e.currentTarget.reportValidity()
                  }
                >
                  <input type="hidden" name="_t" value="comment" />
                  <input type="hidden" name="videoId" value={v.id} />
                  <input type="hidden" name="userId" value={sessionUserId} />

                  <Input
                    name="body"
                    required
                    placeholder="Add a comment…"
                    className="flex-1"
                  />
                  <Button size="sm" type="submit">
                    Send
                  </Button>
                </Form>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
