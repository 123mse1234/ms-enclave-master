"use client";

import Image from "next/image";
import { galleryImages } from "./galleryList";

export default function GalleryScrollSection() {
  // Take only first 20 images
  const images = galleryImages.slice(0, 20);

  // Duplicate for infinite smooth loop
  const duplicatedImages = [...images, ...images];

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-black">
            Explore Our Moments
          </h2>
          <p className="text-gray-600 mt-3">
            A glimpse into the elegance and beauty of M.S. Enclave Heritage Resort.
          </p>
        </div>

        {/* Scroll Container */}
        <div className="relative h-[800px] overflow-hidden">

          <div className="animate-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {duplicatedImages.map((img, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl shadow-lg"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="w-full h-[250px] object-cover"
                />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Animation Style */}
      <style jsx>{`
        .animate-scroll {
          animation: scrollUp 40s linear infinite;
        }

        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </section>
  );
}