"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { galleryImages } from "./galleryList";

const IMAGES_PER_LOAD = 6;

export default function GalleryGrid() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_LOAD);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // ✅ Categories
  const categories = useMemo(() => {
    return ["All", ...new Set(galleryImages.map((img) => img.category))];
  }, []);

  // ✅ Filtered Images
  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return galleryImages;
    return galleryImages.filter(
      (img) => img.category === activeCategory
    );
  }, [activeCategory]);

  const visibleImages = filteredImages.slice(0, visibleCount);

  // ✅ Infinite Scroll Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleCount < filteredImages.length
        ) {
          setVisibleCount((prev) => prev + IMAGES_PER_LOAD);
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [visibleCount, filteredImages.length]);

  return (
    <section className=" py-10 w-full">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <div className="text-center pb-10">
          <h2 className="text-5xl mt-3 font-semibold text-amber-100  leading-tight text-shadow-sm ">
            View By Category
          </h2>
          <p className="text-white font-medium text-lg leading-relaxed font-dm text-shadow-lg mt-3">Browse our gallery through carefully organized categories to easily discover the beauty of the resort. From elegant rooms to scenic outdoor spaces, each section highlights a unique experience. Select a category below and explore moments captured across nature, comfort, and heritage.</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-10 ">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(IMAGES_PER_LOAD);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition hover:animate-bounce
                ${
                  activeCategory === cat
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {/* Gallery Grid - Masonry Style */}
<div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
  {visibleImages.map((img, i) => (
    <figure
      key={img.src}
      className="
        group
        relative
        overflow-hidden
        rounded-xl
        cursor-pointer
        break-inside-avoid
      "
      onClick={() => {
        setIndex(i);
        setOpen(true);
      }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={800}
        height={600}
        className="
          w-full
          h-auto
          object-cover
          transition-transform
          duration-500
          group-hover:scale-105
        "
      />

      <figcaption
        className="
          absolute inset-0
          bg-black/40
          flex items-end
          p-4
          opacity-0
          group-hover:opacity-100
          transition
          font-dm
        "
      >
        <span className="text-white text-sm font-medium">
          {img.alt}
        </span>
      </figcaption>
    </figure>
  ))}
</div>

        {/* Infinite Scroll Trigger */}
        <div ref={loadMoreRef} className="h-10"></div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        controller={{ closeOnBackdropClick: true }}
        close={() => setOpen(false)}
        index={index}
        slides={filteredImages.map((img) => ({
          src: img.src,
          alt: img.alt,
        }))}
        styles={{
          container: { backgroundColor: "rgba(15,15,16,0.95)" },
        }}
      />
    </section>
  );
}