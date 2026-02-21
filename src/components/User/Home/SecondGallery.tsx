"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import "swiper/css";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";

const images = [
  "/images/common/ms-enclave-54.webp",
    "/images/common/ms-enclave-54.webp",
    "/images/home/ms-slider-2.webp",
    "/images/common/ms-enclave-54.webp",
    "/images/common/ms-enclave-54.webp",
    "/images/home/ms-slider-2.webp",
    "/images/common/ms-enclave-54.webp",
    "/images/common/ms-enclave-54.webp",
    "/images/home/ms-slider-2.webp",
    "/images/common/ms-enclave-54.webp",
    "/images/common/ms-enclave-54.webp",
    "/images/home/ms-slider-2.webp",
    "/images/common/ms-enclave-54.webp",
    "/images/common/ms-enclave-54.webp",
    "/images/home/ms-slider-2.webp",
    "/images/common/ms-enclave-54.webp",
    "/images/common/ms-enclave-54.webp",
    "/images/home/ms-slider-2.webp",
];

const SecondGallery = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-blue-900 text-shadow-md">
            Explore Our Gallery
          </h2>
          <p className="mt-4 text-black text-shadow-md">
            A glimpse of comfort, elegance, and unforgettable moments
          </p>
        </div>

        {/* Swiper */}
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
                  alt={`Gallery ${i}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Lightbox Preview */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={images.map((src) => ({ src }))}
          styles={{
            container: {
              backgroundColor: "rgba(0, 0, 0, 0.82)", // 👈 CHANGE BACKGROUND HERE
            },
          }}
        />
      </div>
    </section>
  );
};

export default SecondGallery;
