"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";

import "swiper/css";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";

const images = [
  "/images/new/ms-enclave-conference-hall.webp",
  "/images/new/ms-enclave-conference-hall-2.webp",
  "/images/common/ms-enclave-45.webp",
  "/images/common/ms-enclave-31.webp",
  "/images/common/ms-enclave-32.webp",
  "/images/common/ms-enclave-33.webp",
  "/images/new/ms-enclave-out-side-5.webp",
  "/images/new/ms-enclave-out-side-4.webp",
];

const PartyHallGallery = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // ✅ Derived value (no state, no useEffect)
  const uniqueImages = useMemo(() => [...images].reverse(), []);

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-semibold text-yellow-100 leading-tight text-shadow-sm">
            A Glimpse Into Our Elegant Event Space
          </h2>
          <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">
            Explore our Party Hall Gallery to get a visual preview of the
            beautifully designed indoor space at M.S. Enclave Heritage Resort.
          </p>
        </div>

        {/* First Swiper */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <div
                className="relative h-[260px] rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
              >
                <Image
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Second Swiper */}
        <div className="hidden md:inline">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            autoplay={{ delay: 2500 }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="mt-4"
          >
            {uniqueImages.map((src, i) => (
              <SwiperSlide key={i}>
                <div
                  className="relative h-[190px] rounded-sm overflow-hidden shadow cursor-pointer group"
                  onClick={() => {
                    // convert reversed index → original index
                    const originalIndex = images.length - 1 - i;
                    setIndex(originalIndex);
                    setOpen(true);
                  }}
                >
                  <Image
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={open}
          controller={{ closeOnBackdropClick: true }}
          close={() => setOpen(false)}
          index={index}
          slides={images.map((src) => ({ src }))}
          styles={{
            container: {
              backgroundColor: "rgba(0, 0, 0, 0.82)",
            },
          }}
        />
      </div>
    </section>
  );
};

export default PartyHallGallery;