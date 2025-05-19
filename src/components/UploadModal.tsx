// src/components/UploadModal.tsx

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { UploadButton } from "@/utils/uploadthing";
  import { useState } from "react";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { UploadCloud, Plus } from "lucide-react";
  import { useSession } from "@/lib/auth-client";
  
  export function UploadModal({ trigger }: { trigger: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [uploading, setUploading] = useState(false);
    const { data: session } = useSession();
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
  
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Upload a video</DialogTitle>
          </DialogHeader>
  
          {!session?.user ? (
            <p className="text-sm text-center text-red-600">
              Please sign in first.
            </p>
          ) : (
            <div className="space-y-4">
              {/* Video Title Input */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Video Title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for your video"
                />
              </div>
  
              {/* Upload Button */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center gap-4 text-slate-600">
                <UploadCloud className="w-10 h-10" />
  
                <UploadButton
                  endpoint="videoUploader"
                  input={{ userId: session.user.id }}
                  disabled={!title.trim() || uploading}
                  className="ut-button:bg-blue-600 ut-button:hover:bg-blue-700 ut-button:text-white ut-button:disabled:bg-gray-400"
                  onBeforeUploadBegin={() => {
                    // stash title for your onUploadComplete hook
                    sessionStorage.setItem("videoTitle", title.trim());
                    return [];
                  }}
                  onUploadBegin={() => {
                    setUploading(true);
                  }}
                  onClientUploadComplete={() => {
                    setUploading(false);
                    setOpen(false);
                    sessionStorage.removeItem("videoTitle");
                    // reload to show the new video
                    window.location.reload();
                  }}
                  onUploadError={(error: Error) => {
                    setUploading(false);
                    alert(`Upload failed: ${error.message}`);
                  }}
                />
  
                <p className="text-xs text-gray-500">MP4 • max 128 MB</p>
              </div>
            </div>
          )}
  
          <Button
            variant="ghost"
            size="sm"
            className="mx-auto mt-4"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
  
  export function ProfileUploadButton() {
    return (
      <UploadModal
        trigger={
          <Button size="sm" variant="default" className="flex items-center gap-1">
            <Plus size={16} />
            <span>Upload</span>
          </Button>
        }
      />
    );
  }
  