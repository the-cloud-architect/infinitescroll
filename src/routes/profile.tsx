// src/routes/profile.tsx
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { db } from "@/db";
import { user, video } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

import { auth } from "@/lib/auth.server";
import { signOut } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfileUploadButton } from "@/components/UploadModal";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

/* ───────── loader ───────── */
export async function loader({ request }: LoaderFunctionArgs) {
  // server-side session lookup (no validateRequest helper)
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return redirect("/login");

  const profileRow = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id))
    .then((rows) => rows[0]!);

  const videos = await db
    .select({
      id:        video.id,
      url:       video.url,
      title:     video.title,
      thumbsUp:  video.thumbsUp,
      thumbsDown: video.thumbsDown,
      createdAt: video.createdAt,
      userId:    video.userId,
    })
    .from(video)
    .where(eq(video.userId, session.user.id))
    .orderBy(desc(video.createdAt));

  return json({
    profile: {
      ...profileRow,
      createdAt: profileRow.createdAt.toISOString(),
      updatedAt: profileRow.updatedAt.toISOString(),
    },
    videos: videos.map((v) => ({
      ...v,
      createdAt: v.createdAt.toISOString(),
    })),
  });
}

/* ───────── action ───────── */
export async function action({ request }: ActionFunctionArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return redirect("/login");

  const fd = await request.formData();

  // Build a partial update object from supplied values only
  const updates: Record<string, unknown> = {
    updatedAt: new Date(),
  };

  const setIfProvided = (field: string) => {
    const val = fd.get(field);
    if (val !== null && String(val).trim() !== "") updates[field] = String(val);
  };

  setIfProvided("name");
  setIfProvided("bio");
  setIfProvided("location");
  setIfProvided("username");

  if (Object.keys(updates).length > 1) {
    // no-op if user submits an empty form
    await db.update(user).set(updates).where(eq(user.id, session.user.id));
  }

  return redirect("/profile");
}

/* ───────── component ───────── */
export default function ProfilePage() {
  const { profile, videos } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen pb-20">
      {/* hero / header */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 text-white pt-12 pb-8 px-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white overflow-hidden flex items-center justify-center">
            {profile.image ? (
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 text-2xl font-bold">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-sm opacity-80">
              {profile.username ? `@${profile.username}` : profile.email}
            </p>
            {profile.location && (
              <p className="text-sm mt-1">{profile.location}</p>
            )}
          </div>
        </div>

        {profile.bio && (
          <p className="text-sm opacity-90 mt-4">{profile.bio}</p>
        )}

        <div className="mt-6 flex justify-between items-center">
          <div>
            <p className="text-xl font-bold">{videos.length}</p>
            <p className="text-xs opacity-80">Videos</p>
          </div>
          <ProfileUploadButton />
        </div>
      </div>

      {/* tabs */}
      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="videos">My Videos</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
        </TabsList>

        {/* videos tab */}
        <TabsContent value="videos" className="p-4">
          {videos.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              <p>You haven&apos;t uploaded any videos yet.</p>
              <ProfileUploadButton />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="aspect-square relative overflow-hidden rounded-md bg-gray-100"
                >
                  <video
                    src={v.url}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-1 rounded">
                    {v.thumbsUp} 👍
                  </div>
                  {v.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <p className="text-white text-xs truncate">{v.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* edit tab */}
        <TabsContent value="edit" className="p-4">
          <Form method="post" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input name="name" defaultValue={profile.name} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <Input
                name="username"
                defaultValue={profile.username || ""}
                placeholder="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <Textarea
                name="bio"
                defaultValue={profile.bio || ""}
                rows={3}
                placeholder="Tell us about yourself"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input
                name="location"
                defaultValue={profile.location || ""}
                placeholder="City, Country"
              />
            </div>

            <Button type="submit" className="w-full">
              Save Profile
            </Button>
          </Form>

          <Button
            type="button"
            variant="outline"
            className="w-full mt-4 text-red-500 border-red-200"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
