"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import Link from "next/link";


import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { galleryImages } from "../Gallery/galleryList";

const fadeUp = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function HomeGallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const headerRef = useRef(null);
  const sliderRef = useRef(null);

  const headerInView = useInView(headerRef, { amount: 0.3 });
  const sliderInView = useInView(sliderRef, { amount: 0.2 });

  // ✅ shuffle + take only 10 images
  const firstTenImages = galleryImages.slice(0, 10);

  return (
    <section className="py-10 relative">
      {/* HEADER */}
      <motion.div
        ref={headerRef}
        variants={fadeUp}
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto px-4 text-center relative"
      >
        <h2 className="text-5xl font-semibold text-yellow-100 leading-tight text-shadow-xl">
          Explore Our Resort
        </h2>

        <p className="text-gray-50 font-medium text-lg leading-relaxed font-dm text-shadow-xl">
          A glimpse into the beauty and serenity of M.S. Enclave Heritage Resort.
        </p>

        <Link
          href="/gallery"
          className="mt-6 inline-block px-10 rounded shadow-lg py-3 bg-white text-black hover:animate-bounce"
        >
          Explore Our Gallery
        </Link>
      </motion.div>

      {/* GALLERY */}
      <motion.div
        ref={sliderRef}
        variants={fadeUp}
        initial="hidden"
        animate={sliderInView ? "visible" : "hidden"}
        transition={{ duration: 1.1, delay: 0.15 }}
        className="mt-14 relative"
      >
        <Swiper
          modules={[EffectCoverflow, Navigation, Autoplay]}
          effect="coverflow"
          centeredSlides
          grabCursor
          loop
          slideToClickedSlide
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 90,
            depth: 260,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-6xl mx-auto overflow-visible"
        >
          {firstTenImages.map((img, i) => (
            <SwiperSlide
              key={i}
              className="flex justify-center overflow-visible pointer-events-auto"
            >
              <div
                onClick={() => setLightbox(img.src)}
                className="relative cursor-pointer"
              >
                <div className="relative w-[500px] h-80 rounded-2xl overflow-hidden shadow-xl">
  <Image
    src={img.src}
    alt={img.alt}
    fill
    className="
      object-cover
      transition-transform
      duration-300
      hover:scale-[1.009]
    "
  />
</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative">
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-white text-4xl"
            >
              ✕
            </button>

            <Image
              src={lightbox}
              alt="Preview"
              width={1200}
              height={800}
              className="rounded-xl max-h-[85vh] w-auto object-contain"
            />
          </div>
        </div>
      )}

      {/* SEO */}
      <div className="sr-only">
        <h3>Luxury Resort Gallery Kerala</h3>
        <p>
          Photo gallery of rooms, swimming pool, garden, dining area,
          outdoor spaces and scenic views at M.S. Enclave Heritage Resort,
          Palakkad, Kerala.
        </p>
      </div>
    </section>
  );
}