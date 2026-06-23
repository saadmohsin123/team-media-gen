"use client";

import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { UploadedReference } from "@/types/generation";

interface ImageUploadProps {
  images: UploadedReference[];
  maxImages: number;
  onChange: (images: UploadedReference[]) => void;
}

function readFile(file: File): Promise<UploadedReference> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        id: crypto.randomUUID(),
        name: file.name,
        dataUrl: reader.result as string,
        mimeType: file.type || "image/png",
      });
    };
    reader.onerror = () => reject(new Error("Failed to read image."));
    reader.readAsDataURL(file);
  });
}

export function ImageUpload({ images, maxImages, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) return;

    const remaining = maxImages - images.length;
    const files = Array.from(fileList)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, remaining);

    if (!files.length) return;

    const uploaded = await Promise.all(files.map(readFile));
    onChange([...images, ...uploaded]);
  }

  function removeImage(id: string) {
    onChange(images.filter((image) => image.id !== id));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product photos</CardTitle>
        <CardDescription>
          Upload the product images to place on or with the selected human model ({images.length}/
          {maxImages}).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-6 text-center transition-colors hover:bg-muted/40"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            void handleFiles(event.dataTransfer.files);
          }}
        >
          <ImagePlus className="mb-2 size-8 text-muted-foreground" />
          <p className="text-sm font-medium">Drop product images here or click to browse</p>
          <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, WEBP up to {maxImages} files</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple={maxImages > 1}
            className="hidden"
            onChange={(event) => void handleFiles(event.target.files)}
          />
        </div>

        {images.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {images.map((image) => (
              <div key={image.id} className="relative overflow-hidden rounded-xl border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.dataUrl} alt={image.name} className="aspect-square w-full object-cover" />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon-xs"
                  className="absolute top-2 right-2"
                  onClick={() => removeImage(image.id)}
                >
                  <X />
                </Button>
                <p className="truncate px-2 py-1 text-xs text-muted-foreground">{image.name}</p>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
