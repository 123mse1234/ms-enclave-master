"use client";

import Breadcrumb from "@/components/common/Breadcrumb";
import FullPageLoader from "@/components/common/FullPageLoader";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import AdminBreadcrumb from "@/components/common/AdminHeader/AdminBreadcrumb";

type GalleryImage = {
  url: string;
  publicId: string;
};

export default function EditPackagePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // ================= FORM =================
  const [formData, setFormData] = useState({
    packageName: "",
    description: "",
    indianPrice: "",
    foreignPrice: "",
    maxAdults: "",
    maxChildren: "",
    amenities: "",
    availability: true,
    image: "",
    imagePublicId: "",
  });

  // ================= MAIN IMAGE =================
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // ================= GALLERY =================
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);

  // ================= FETCH =================
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`/api/packages/edit/${id}`);
        const p = res.data;

        setFormData({
          packageName: p.packageName ?? "",
          description: p.description ?? "",
          indianPrice: p.indianPrice ?? "",
          foreignPrice: p.foreignPrice ?? "",
          maxAdults: p.maxAdults ?? "",
          maxChildren: p.maxChildren ?? "",
          amenities: p.amenities?.join(", ") ?? "",
          availability: p.availability ?? true,
          image: p.image ?? "",
          imagePublicId: p.imagePublicId ?? "",
        });

        setImagePreview(p.image);
        setGallery(p.images || []);
      } catch {
        toast.error("Failed to load package");
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  useEffect(() => {
  }, [galleryImages])

  // ================= HANDLERS =================
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMainImage = (file: File | null) => {
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    setGalleryImages((prev) => [...prev, ...files]);
    setNewGalleryFiles((prev) => [...prev, ...files]);
    setGalleryPreview((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const handleGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setNewGalleryFiles((prev) => [...prev, ...files]);
    setGalleryImages((prev) => [...prev, ...files]);
    setGalleryPreview((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  // ================= UPLOAD =================
  const uploadImage = async (file: File) => {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body });
    return res.json();
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let mainImageUrl = formData.image;
      let mainImagePublicId = formData.imagePublicId;

      if (imageFile) {
        const uploaded = await uploadImage(imageFile);
        mainImageUrl = uploaded.secure_url;
        mainImagePublicId = uploaded.public_id;
      }

      const uploadedGallery: GalleryImage[] = [];
      for (const file of newGalleryFiles) {
        const img = await uploadImage(file);
        uploadedGallery.push({
          url: img.secure_url,
          publicId: img.public_id,
        });
      }

      const res = await axios.put(`/api/packages/edit/${id}`, {
        ...formData,
        image: mainImageUrl,
        imagePublicId: mainImagePublicId,
        amenities: formData.amenities.split(",").map((a) => a.trim()),
        images: [...gallery, ...uploadedGallery],
        removedImages,
      });

      if (res.data.success) {
        toast.success("Package Updated Successfully");
        router.push(`/admin/packages/${res.data.data.slug}`);
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <FullPageLoader text="Loading Package..." />;

  return (
    <section className="min-h-screen">
      <AdminBreadcrumb
        heading={formData.packageName}
        bgImage={imagePreview || "/images/common/ms-enclave-17.webp"}
        items={[{ label: "Edit Package", href: "#" }]}
      />

      <div className="relative  flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-end scale-110 blur-xs"
          style={{
            backgroundImage: `url(${
              imagePreview || "/images/common/ms-enclave-17.webp"
            })`,
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative z-10 w-full max-w-6xl bg-white/95 backdrop-blur-md rounded-2xl shadow-lg my-12">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="hidden md:flex relative bg-gray-900">
              <img
                src={imagePreview || "/images/common/ms-enclave-17.webp"}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 p-8 text-white text-center">
                <h2 className="text-white text-4xl font-bold mb-2 text-shadow-lg">
                  Edit Package
                </h2>
                <p className="text-white text-lg text-shadow-lg">
                  Update pricing, amenities & images
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="md:col-span-2 p-8">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black font-dm"
              >
                {[
                  ["packageName", "Package Name"],
                  ["indianPrice", "Indian Price"],
                  ["foreignPrice", "Foreign Price"],
                  ["maxAdults", "Max Adults"],
                  ["maxChildren", "Max Children"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className="font-semibold">{label}</label>
                    <input
                      name={name}
                      value={(formData as any)[name]}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full bg-transparent border-0 border-b-2 border-gray-300 px-1 py-2 focus:outline-none transition-all duration-300 hover:border-red-500 focus:border-blue-500 focus:shadow-[0_2px_0_0_rgba(59,130,246,0.6)]"
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="font-semibold">Package Provide Facilities</label>
                  <input
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full bg-transparent border-0 border-b-2 border-gray-300 px-1 py-2 focus:outline-none transition-all duration-300 hover:border-red-500 focus:border-blue-500 focus:shadow-[0_2px_0_0_rgba(59,130,246,0.6)]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-semibold ">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="mt-2 w-full bg-transparent border-0 border-b-2 border-gray-300 px-1 py-2 focus:outline-none transition-all duration-300 hover:border-red-500 focus:border-blue-500 focus:shadow-[0_2px_0_0_rgba(59,130,246,0.6)]"
                  />
                </div>

                {/* MAIN IMAGE */}
                <div className="md:col-span-2">
                  <label className="font-semibold ">
                    Main Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleMainImage(e.target.files?.[0] || null)
                    }
                    className="ml-10 inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      className="mt-3 w-40 h-40 rounded object-cover"
                    />
                  )}
                </div>

                {/* EXISTING GALLERY */}
                <div className="md:col-span-2 flex flex-wrap gap-3">
                  <label className="font-semibold ">
                    Galley Images
                  </label>
                  {gallery.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={img.url}
                        className="w-24 h-24 rounded object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setGallery((g) => g.filter((_, idx) => idx !== i));
                          setRemovedImages((r) => [...r, img.publicId]);
                        }}
                        className="absolute -top-2 -right-2 bg-white hover:bg-red-500 hover;text-white text-black w-6 font-black h-6 rounded-full"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>

                {/* GALLERY UPLOAD */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    setIsDragging(false);
                    handleDrop(e);
                  }}
                  onDragEnter={() => setIsDragging(true)}
                  onDragLeave={() => setIsDragging(false)}
                  className={`md:col-span-2 border-2 border-dashed rounded-xl p-6 transition ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleGallerySelect}
                    className="hidden"
                    id="galleryInput"
                  />

                  <p className="text-gray-600 font-medium">
                    Drag & Drop Gallery Images
                  </p>

                  <label
                    htmlFor="galleryInput"
                    className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
                  >
                    Select Images
                  </label>

                  <p className="mt-3 text-sm text-gray-500">
                    {galleryImages.length} image(s) selected
                  </p>
                </div>

                <div className="md:col-span-2 flex flex-wrap gap-3">
                  {galleryPreview.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="w-24 h-24 rounded object-cover"
                    />
                  ))}
                </div>

                <div className="md:col-span-2">
                  <button
                    disabled={uploading}
                    className="w-full bg-blue-600 text-white py-3 rounded"
                  >
                    {uploading ? "Updating..." : "Update Package"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {uploading && <FullPageLoader text="Updating Package..." />}
    </section>
  );
}
