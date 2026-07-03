"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface ProductImageUploadProps {
  name?: string;
  required?: boolean;
}

export default function ProductImageUpload({
  name = "image_url",
  required = true,
}: ProductImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5 MB.");
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(10);

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop() || "jpg";
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      setProgress(40);

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      setProgress(80);

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(fileName);

      setUploadedUrl(publicUrl);
      setProgress(100);
    } catch (err) {
      setPreviewUrl(null);
      setUploadedUrl("");
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleFileSelect(file);
  };

  const handleRemove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setUploadedUrl("");
    setProgress(0);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="product-image-upload">Find Image</Label>

      <input type="hidden" name={name} value={uploadedUrl} required={required} />

      <input
        ref={inputRef}
        id="product-image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
        disabled={uploading}
      />

      {!previewUrl ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border/80 bg-background px-6 py-10 transition-colors",
            "hover:border-[var(--accent)]/40 hover:bg-[var(--cream)]/50",
            "disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
              <span className="text-sm text-muted-foreground">Uploading…</span>
            </>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Upload Image</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG or WebP · max 5 MB
                </p>
              </div>
            </>
          )}
        </button>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border/60 bg-background">
          <div className="relative aspect-video w-full bg-muted">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-contain"
              unoptimized
            />
            {!uploading && uploadedUrl && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute right-2 top-2 rounded-full bg-background/90 p-1.5 shadow-sm transition-colors hover:bg-background"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {uploading && (
            <div className="px-4 py-3">
              <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>Uploading to storage…</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {uploadedUrl && !uploading && (
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <p className="text-xs text-muted-foreground">Image uploaded successfully</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
              >
                Replace
              </Button>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Upload directly from your device — saved automatically to storage.
      </p>
    </div>
  );
}
