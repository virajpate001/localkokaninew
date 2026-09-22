// src/components/admin/ImageUploader.jsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FiUpload, FiX, FiLoader, FiImage, FiAlertTriangle } from "react-icons/fi";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "@/lib/cloudinary";

// Reads actual pixel dimensions from a File before upload
function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = reject;
    img.src = url;
  });
}

export default function ImageUploader({
  value,
  onChange,
  folder = "general",
  label = "Image",
  minWidth = 1600, // ⬅️ NEW — configurable per use case
  minHeight = 1200,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    // NEW: check actual pixel dimensions and warn (not block) if too small
    try {
      const { width, height } = await getImageDimensions(file);
      if (width < minWidth || height < minHeight) {
        toast(
          `This image is ${width}×${height}px — we recommend at least ${minWidth}×${minHeight}px for best quality. Uploading anyway.`,
          { icon: "⚠️", duration: 5000 }
        );
      }
    } catch {
      // dimension check failed silently — not critical, proceed with upload anyway
    }

    setIsUploading(true);
    try {
      const result = await uploadToCloudinary(file, folder);
      onChange(result);
      toast.success("Image uploaded");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {value?.url ? (
        <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-gray-200">
          <Image src={value.url} alt="Uploaded" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
            aria-label="Remove image"
          >
            <FiX />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`aspect-[16/9] rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${dragActive ? "border-secondary bg-secondary/5" : "border-gray-200 hover:border-secondary/50"
            }`}
        >
          {isUploading ? (
            <>
              <FiLoader className="animate-spin text-2xl text-secondary mb-2" />
              <p className="text-gray-400 text-sm">Uploading...</p>
            </>
          ) : (
            <>
              <FiImage className="text-3xl text-gray-300 mb-2" />
              <p className="text-gray-500 text-sm font-medium flex items-center gap-1.5">
                <FiUpload /> Click or drag an image here
              </p>
              <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                <FiAlertTriangle className="text-[10px]" />
                Recommended: {minWidth}×{minHeight}px or larger, under 5MB
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}