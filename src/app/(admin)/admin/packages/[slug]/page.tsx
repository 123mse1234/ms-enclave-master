"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Breadcrumb from "@/components/common/Breadcrumb";
import FullPageLoader from "@/components/common/FullPageLoader";

export default function SinglePackagePage() {
  const { slug } = useParams();
  const router = useRouter();

  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!slug) return;

    const fetchPackage = async () => {
      try {
        const res = await fetch(`/api/packages/${slug}`);
        const data = await res.json();
        if (data.success) {
          setPkg(data.data);
          setImages([data.data.image, ...(data.data.images?.map((img: any) => img.url) || [])]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [slug]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <FullPageLoader text="Loading Package..." />;

  if (!pkg)
    return (
      <p className="text-center text-red-500 p-10 text-lg font-semibold">
        Package not found
      </p>
    );

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumb
        heading={pkg.packageName || "Package Details"}
        bgImage={pkg.image || "/images/common/ms-enclave-17.webp"}
        items={[{ label: pkg.packageName || "Package", href: "#" }]}
      />

      <div className="relative  flex items-center justify-center overflow-hidden font-dm">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-end scale-110 blur-xs"
          style={{
            backgroundImage: `url(${
              pkg.image || "/images/common/ms-enclave-17.webp"
            })`,
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative z-10 w-full max-w-6xl bg-white/95 backdrop-blur-md rounded-2xl shadow-lg my-12">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Left - Main Image */}
          <div
            className="relative h-80 md:h-full cursor-pointer overflow-hidden"
            onClick={() => openLightbox(0)}
          >
            <img
              src={pkg.image || "/images/common/ms-enclave-17.webp"}
              alt={pkg.packageName}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            
          </div>

          {/* Right - Info Card */}
          <div className="md:col-span-2 p-8 flex flex-col justify-between">

            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                {pkg.packageName}
              </h1>
            {/* Description */}
            <div>
              <h2 className="text-lg text-black font-semibold mb-3">Description</h2>
              <p className="text-black text-md">{pkg.description}</p>

              {/* Package Details */}
              <div className="mt-6 grid grid-cols-1 gap-3 text-black pr-10 pl-2 font-medium">
                <div className="flex justify-between border-b border-gray-200 py-2">
                  <span className="font-bold">Indian Price:</span>
                  <span>₹ {pkg.indianPrice ?? "-"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                  <span className="font-bold">Foreign Price:</span>
                  <span>$ {pkg.foreignPrice ?? "-"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                  <span className="font-bold">Max Adults:</span>
                  <span>{pkg.maxAdults ?? "-"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                  <span className="font-bold">Max Children:</span>
                  <span>{pkg.maxChildren ?? "-"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                  <span className="font-bold">Amenities:</span>
                  <span>{pkg.amenities?.join(", ") ?? "-"}</span>
                </div>
              </div>

              {/* Gallery */}
              {pkg.images && pkg.images.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-lg text-black font-semibold mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:max-h-[300px] overflow-y-scroll">
                    {pkg.images.map((img: any, i: number) => (
                      <div
                        key={i}
                        className="relative overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => openLightbox(i + 1)}
                      >
                        <img
                          src={img.url}
                          alt={`Gallery ${i + 1}`}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                onClick={() => router.push(`/admin/packages/edit/${pkg._id}`)}
              >
                Edit Package
              </button>
              <button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
                onClick={async () => {
                  if (!confirm("Are you sure you want to delete this package?"))
                    return;
                  await fetch(`/api/packages/edit/${pkg._id}`, {
                    method: "DELETE",
                  });
                  router.push("/admin/packages");
                }}
              >
                Delete Package
              </button>
            </div>
          </div>
        </div>
      </div>

      </div>

      

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold z-50"
              onClick={closeLightbox}
            >
              &times;
            </button>

            {/* Prev Button */}
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold z-50"
              onClick={prevImage}
            >
              &#10094;
            </button>

            {/* Next Button */}
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold z-50"
              onClick={nextImage}
            >
              &#10095;
            </button>

            {/* Image */}
            <img
              src={images[currentIndex]}
              alt={`Lightbox Image ${currentIndex + 1}`}
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
}
