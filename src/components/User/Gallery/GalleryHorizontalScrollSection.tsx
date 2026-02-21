"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { galleryImages } from "./galleryList";

export default function GalleryHorizontalScrollSection() {
  const images = galleryImages.slice(0, 20);
  const duplicatedImages = [...images, ...images];

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <section className="relative overflow-hidden p-10">
      <div className="relative overflow-hidden">

        <div className="flex animate-scroll gap-6 w-max">

          {duplicatedImages.map((img, i) => {
            // Important: map duplicated index back to original index
            const realIndex = i % images.length;

            return (
              <div
                key={i}
                className="shrink-0 w-[90vw] sm:w-[45vw] lg:w-[30vw] cursor-pointer"
                onClick={() => {
                  setIndex(realIndex);
                  setOpen(true);
                }}
              >
                <div className="overflow-hidden shadow-lg">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="w-full h-[300px] object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        controller={{ closeOnBackdropClick: true }}
        slides={images.map((img) => ({
          src: img.src,
          alt: img.alt,
        }))}
        styles={{
          container: { backgroundColor: "rgba(15,15,16,0.95)" },
        }}
      />

      {/* Animation */}
      <style jsx>{`
        .animate-scroll {
          animation: scrollLeft 70s linear infinite;
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}