"use client";

import Breadcrumb from "@/components/common/Breadcrumb";
import FullPageLoader from "@/components/common/FullPageLoader";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddPackage() {
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    packageName: "",
    description: "",
    indianPrice: "",
    foreignPrice: "",
    maxAdults: "",
    maxChildren: "",
    amenities: "",
    availability: true,
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= MAIN IMAGE =================
  const handleMainImage = (file: File | null) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ================= DRAG & DROP =================
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    setGalleryImages((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreview((prev) => [...prev, ...previews]);
  };

  // ================= SELECT BUTTON =================
  const handleGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    setGalleryImages((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreview((prev) => [...prev, ...previews]);
  };

  // ================= UPLOAD =================
  const uploadSingleImage = async (file: File) => {
    const body = new FormData();
    body.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body,
    });

    return res.json();
  };

  const uploadGalleryImages = async () => {
    const uploaded = [];
    for (const file of galleryImages) {
      const data = await uploadSingleImage(file);
      uploaded.push({ url: data.secure_url, publicId: data.public_id });
    }
    return uploaded;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const mainImage = await uploadSingleImage(image as File);
      const gallery = await uploadGalleryImages();

      const payload = {
        ...formData,
        amenities: formData.amenities.split(","),
        image: {
          url: mainImage.secure_url,
          public_id: mainImage.public_id,
        },
        images: gallery,
      };

      const res = await fetch("/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Package Created Successfully");
        router.push(`/admin/packages/${data.data.slug}`);
      } else {
        toast.error(data.message || "Package Not Created");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="min-h-screen">
      <Breadcrumb
        heading="Add Packages"
        bgImage="/images/common/ms-enclave-17.webp"
        items={[{ label: "Add Packages", href: "/admin/packages/add" }]}
      />

      <div className="relative  flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-end scale-110 blur-xs"
          style={{
            backgroundImage:
              "url('/images/activities/ms-enclave-palakkad-activity2.webp')",
          }}
        ></div>

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-white/70"></div> */}

        <div className="relative z-10 w-full max-w-6xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl my-12 ">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* LEFT SIDE – IMAGE */}
            <div className="relative hidden md:flex flex-col justify-center items-center bg-gray-900">
              <img
                src="/images/common/ms-enclave-17.webp"
                alt="Package Illustration"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="relative z-10 p-8 text-center font-dm">
                <h2 className="text-white text-4xl font-bold mb-2 text-shadow-lg">
                  Create New Package
                </h2>
                <p className="text-white text-lg text-shadow-lg">
                  Add pricing, amenities & gallery images for this package
                </p>
              </div>
            </div>
            {/* RIGHT SIDE */}

            <div className="md:col-span-2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Add New Package
              </h1>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black font-dm"
              >
                {/* Package Name */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Package Name
                  </label>
                  <input
                    name="packageName"
                    placeholder="Enter package name"
                    className="mt-2 w-full bg-transparent border-0 border-b-2 border-gray-300 px-1 py-2 focus:outline-none transition-all duration-300 hover:border-red-500 focus:border-blue-500 focus:shadow-[0_2px_0_0_rgba(59,130,246,0.6)]"
                    onChange={handleChange}
                  />
                </div>

                {/* Prices & Counts */}
                {[
                  ["indianPrice", "Indian Price (₹)"],
                  ["foreignPrice", "Foreign Price"],
                  ["maxAdults", "Max Adults"],
                  ["maxChildren", "Max Children"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className="text-sm font-semibold text-gray-700">
                      {label}
                    </label>
                    <input
                      name={name}
                      type="number"
                      placeholder="0"
                      className="mt-2 w-full bg-transparent border-0 border-b-2 border-gray-300 px-1 py-2 focus:outline-none transition-all duration-300 hover:border-red-500 focus:border-blue-500 focus:shadow-[0_2px_0_0_rgba(59,130,246,0.6)]"
                      onChange={handleChange}
                    />
                  </div>
                ))}

                {/* Package Provide Facilities */}
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Package Provide Facilities
                  </label>
                  <input
                    name="amenities"
                    placeholder="Breakfast, Full Meal, Swimming Pool"
                    className="mt-2 w-full bg-transparent border-0 border-b-2 border-gray-300 px-1 py-2 focus:outline-none transition-all duration-300 hover:border-red-500 focus:border-blue-500 focus:shadow-[0_2px_0_0_rgba(59,130,246,0.6)]"
                    onChange={handleChange}
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    className="mt-2 w-full bg-transparent border-0 border-b-2 border-gray-300 px-1 py-2 focus:outline-none transition-all duration-300 hover:border-red-500 focus:border-blue-500 focus:shadow-[0_2px_0_0_rgba(59,130,246,0.6)]"
                    onChange={handleChange}
                  />
                </div>

                {/* Main Image */}
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
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

                  {preview && (
                    <img
                      src={preview}
                      className="mt-4 w-44 h-44 rounded-lg object-cover shadow"
                    />
                  )}
                </div>

                {/* Gallery Upload */}
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

                {/* Gallery Preview */}
                <div className="md:col-span-2 flex flex-wrap gap-3">
                  {galleryPreview.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="w-24 h-24 rounded-lg object-cover shadow-sm"
                    />
                  ))}
                </div>

                {/* Save Button */}
                <div className="md:col-span-2">
                  <button
                    disabled={uploading}
                    className={`w-full py-3 rounded-lg text-white font-semibold ${
                      uploading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {uploading ? "Uploading..." : "Save Package"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <>
        {uploading && <FullPageLoader text="Creating New Package..." />}

        <div className="max-w-3xl mx-auto p-6 text-black">
          {/* existing content */}
        </div>
      </>
    </section>
  );
}
