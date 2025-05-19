import { generateUploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/routes/api.uploadthing";

export const UploadButton = generateUploadButton<OurFileRouter>();
