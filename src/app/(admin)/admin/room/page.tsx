"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import FullPageLoader from "@/components/common/FullPageLoader";

export default function RoomSettingsPage() {
  const [totalRooms, setTotalRooms] = useState<number>(8);
  const router = useRouter();

  const [heroImage, setHeroImage] = useState<string>("");
  const [heroUploading, setHeroUploading] = useState(false);

  const [gallery, setGallery] = useState<string[]>([]);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [replaceLoading, setReplaceLoading] = useState(false);

  // Fetch Data
  useEffect(() => {
    axios.get("/api/admin/room-settings").then((res) => {
      if (res.data) {
        setTotalRooms(res.data.totalRooms || 8);
        setHeroImage(res.data.heroImage || "");
        setGallery(res.data.gallery || []);
      }
      setLoading(false);
    });
  }, []);

  // Delete from Cloudinary
  const deleteFromCloudinary = async (url: string) => {
    setUploading(true);

    await axios.post("/api/admin/delete-image", {
      imageUrl: url, // <-- important for DB delete
    });
    setUploading(false);
  };

  // Upload Image
  const uploadImage = async (file: File, setProg?: (n: number) => void) => {
    setUploading(true);

    if (setProg) setProg(0);
    const form = new FormData();
    form.append("file", file);

    const res = await axios.post("/api/upload", form, {
      onUploadProgress: (e) => {
        if (!setProg) return;
        const percent = Math.round((e.loaded * 100) / e.total!);
        setProg(percent);
      },
    });

    return res.data.secure_url;
    setUploading(false);
  };

  // Replace image
  const replaceImage = async (oldUrl: string, file: File) => {
    setUploading(true);
    setReplaceLoading(true);
    setProgress(0);

    await deleteFromCloudinary(oldUrl);
    const newUrl = await uploadImage(file, setProgress);

    setGallery((prev) => prev.map((img) => (img === oldUrl ? newUrl : img)));

    setReplaceLoading(false);
    setProgress(0);
    setUploading(false);
  };

  // Save settings
  const saveSettings = async () => {
    setUploading(true);
    let uploadedGallery = [...gallery];

    if (galleryFiles.length > 0) {
      const uploads = await Promise.all(
        galleryFiles.map((file) => uploadImage(file))
      );
      uploadedGallery = [...gallery, ...uploads];
    }

    const res = await axios.put("/api/admin/room-settings", {
      totalRooms,
      heroImage,
      gallery: uploadedGallery,
    });

    const data = res.data; // Axios auto-parsed

    if (data.success) {
      toast.success("Room Updated Successfully!");
      setGalleryPreview([]);
      setGalleryFiles([]);
      router.push("/admin/room");
    } else {
      toast.error(data.message || "Room Not Updated");
    }
    setUploading(false);
  };

  // Drag & Drop handler
  const handleDrop = (e: any) => {
    e.preventDefault();
    setUploading(true);

    const files = Array.from(e.dataTransfer.files) as File[];

    const previews = files.map((f) => URL.createObjectURL(f));
    setGalleryPreview((prev) => [...prev, ...previews]);
    setGalleryFiles((prev) => [...prev, ...files]);

    setDragActive(false);
    setUploading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">Room Settings</h1>

      {/* GLOBAL UPLOAD PROGRESS */}
      {(replaceLoading || uploading) && progress > 0 && (
        <div className="mb-4">
          <p className="text-sm font-semibold">Uploading… {progress}%</p>
          <div className="w-full bg-gray-300 h-2 rounded">
            <div
              style={{ width: `${progress}%` }}
              className="bg-blue-600 h-2 rounded"
            ></div>
          </div>
        </div>
      )}

      {/* Total Rooms */}
      <div className="mb-6">
        <label className="font-semibold">Total Rooms</label>
        <input
          type="number"
          value={totalRooms}
          onChange={(e) => setTotalRooms(Number(e.target.value))}
          className="border p-2 w-full mt-1"
        />
      </div>

      {/* Hero Image */}
      <div className="mb-6">
        <label className="font-semibold">Hero Image</label>

        {heroImage && (
          <img src={heroImage} className="rounded mb-3 h-40 object-cover" />
        )}

        <input
          type="file"
          onChange={async (e) => {
            if (e.target.files?.[0]) {
              setHeroUploading(true);
              const url = await uploadImage(e.target.files[0]);
              setHeroImage(url);
              setHeroUploading(false);
            }
          }}
          className="border p-2 w-full"
        />

        {heroUploading && <p className="text-sm">Uploading hero…</p>}
      </div>

      {/* Gallery */}
      <div className="mb-6">
        <label className="font-semibold">Gallery Images</label>

        <div className="grid grid-cols-3 gap-3 mt-2">
          {gallery.map((img, i) => (
            <div key={i} className="relative group">
              <img
                src={img}
                onClick={() => setZoomIndex(i)}
                className="rounded h-28 w-full object-cover cursor-pointer hover:opacity-80 transition"
              />

              {/* DELETE */}
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  setDeleteLoading(true);
                  await deleteFromCloudinary(img);
                  setGallery((prev) => prev.filter((g) => g !== img));
                  setDeleteLoading(false);
                }}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 z-20"
              >
                {deleteLoading ? "…" : "Delete"}
              </button>

              {/* REPLACE */}
              <label className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 cursor-pointer z-20">
                Replace
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      replaceImage(img, e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
          ))}
        </div>

        {/* ZOOM MODAL + NEXT & PREV */}
        {zoomIndex !== null && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
            onClick={() => setZoomIndex(null)}
          >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <img
                src={gallery[zoomIndex]}
                className="max-w-[90vw] max-h-[80vh] rounded shadow-lg"
              />

              {/* CLOSE */}
              <button
                onClick={() => setZoomIndex(null)}
                className="absolute -top-12 right-0 text-white bg-red-600 px-4 py-2 rounded"
              >
                Close
              </button>

              {/* PREV */}
              {zoomIndex > 0 && (
                <button
                  onClick={() => setZoomIndex((i) => (i! > 0 ? i! - 1 : i))}
                  className="absolute left-[-60px] top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white text-3xl px-3 py-2 rounded"
                >
                  ‹
                </button>
              )}

              {/* NEXT */}
              {zoomIndex < gallery.length - 1 && (
                <button
                  onClick={() =>
                    setZoomIndex((i) => (i! < gallery.length - 1 ? i! + 1 : i))
                  }
                  className="absolute right-[-60px] top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white text-3xl px-3 py-2 rounded"
                >
                  ›
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Drag & Drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed p-8 rounded text-center mt-4 ${
          dragActive ? "bg-blue-100" : "bg-gray-100"
        }`}
      >
        Drag & Drop Images
      </div>

      {/* Preview */}
      {galleryPreview.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {galleryPreview.map((p, i) => (
            <img
              key={i}
              src={p}
              className="rounded h-28 w-full object-cover opacity-80"
            />
          ))}
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={saveSettings}
        disabled={uploading}
        className={`mt-6 px-6 py-2 text-white rounded flex items-center justify-center gap-2 transition ${
          uploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? (
          <>
            <Spinner />
            Updating...
          </>
        ) : (
          "Save Settings"
        )}
      </button>
      <>
        {uploading && <FullPageLoader text="Updating Room Settings..." />}

        <div className="max-w-3xl mx-auto p-6 text-black">
          {/* existing content */}
        </div>
      </>
    </div>
  );
}

const Spinner = () => (
  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
);
