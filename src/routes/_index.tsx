import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "../db";
import { video, videoComment, user } from "@/db/schema";
import { desc, eq, inArray } from "drizzle-orm";
import { sql } from "drizzle-orm/sql";
import { useSession } from "@/lib/auth-client";
import { VideoPlayer } from "@/components/VideoPlayer";
import type { VideoItem, CommentRow } from "@/types";

/* ---------- loader ---------- */
export async function loader({}: LoaderFunctionArgs) {
  const vids = await db
    .select({
      id: video.id,
      url: video.url,
      title: video.title,
      thumbsUp: video.thumbsUp,
      thumbsDown: video.thumbsDown,
      authorName: user.name,
      userId: video.userId,
      createdAt: video.createdAt,
    })
    .from(video)
    .leftJoin(user, eq(video.userId, user.id))
    .orderBy(desc(video.createdAt));

  console.log("[loader] video rows →", vids.length);

  if (vids.length === 0) return json({ videos: [] });

  const ids = vids.map((v) => v.id);
  const cmts = await db
    .select({
      id: videoComment.id,
      videoId: videoComment.videoId,
      body: videoComment.body,
      authorName: user.name,
    })
    .from(videoComment)
    .leftJoin(user, eq(videoComment.userId, user.id))
    .where(inArray(videoComment.videoId, ids));

  console.log("[loader] comment rows →", cmts.length);

  const byVideo: Record<number, CommentRow[]> = {};
  for (const c of cmts) (byVideo[c.videoId] ||= []).push(c);

  const data = vids.map<VideoItem>((v) => ({
    ...v,
    createdAt: v.createdAt.toISOString(),
    comments: byVideo[v.id] ?? [],
  }));

  return json({ videos: data });
}

/* ---------- actions ---------- */
export async function action({ request }: ActionFunctionArgs) {
  const fd = await request.formData();
  const type = fd.get("_t");

  if (type === "vote") {
    const id = Number(fd.get("videoId"));
    await db.execute(
      sql`
        update "video"
        set ${fd.get("dir") === "up"
          ? sql`"thumbs_up" = "thumbs_up" + 1`
          : sql`"thumbs_down" = "thumbs_down" + 1`}
        where "id" = ${id}
      `,
    );
    return json({ ok: true });
  }

  if (type === "comment") {
    const id = Number(fd.get("videoId"));
    const userId = String(fd.get("userId"));
    const body = String(fd.get("body"));
    await db.insert(videoComment).values({ videoId: id, userId, body });
    return redirect(request.headers.get("Referer") ?? "/");
  }

  return json({ ok: false }, 400);
}

/* ---------- page component ---------- */
export default function Home() {
  const { videos } = useLoaderData<typeof loader>();
  const { data: session } = useSession();
  
  if (videos.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center text-slate-600 bg-black text-white">
        <p className="mb-4">No videos yet.</p>
        <p>Head to your profile to upload videos.</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black">
      <VideoPlayer 
        videos={videos} 
        sessionUserId={session?.user?.id ?? null} 
      />
    </div>
  );
}