// src/routes/api.uploadthing.tsx

import { createUploadthing, type FileRouter } from "uploadthing/server";
import { db } from "@/db";
import { video } from "@/db/schema";
import { z } from "zod";  // for input parsing

const f = createUploadthing();

export const fileRouter = {
  videoUploader: f({ video: { maxFileSize: "128MB" } })
    // Only accept a userId string as input
    .input(z.object({ userId: z.string() }))
    // This code runs on your server before upload
    .middleware(async ({ input }) => {
      // input.userId is now guaranteed a string
      return { userId: input.userId };
    })
    // This code runs on your server after upload
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("[onUploadComplete] fileData", file);

      // Persist video record in your database
      await db.insert(video).values({
        userId: metadata.userId,
        url: file.url,
        createdAt: new Date(),
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof fileRouter;
