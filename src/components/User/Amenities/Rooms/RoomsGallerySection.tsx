"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Thumbs,
  FreeMode,
  Autoplay,
} from "swiper/modules";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import Link from "next/link";

export default function RoomsGallerySection() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const images = [
    "/images/common/ms-enclave-24.webp",
    "/images/common/ms-enclave-25.webp",
    "/images/common/ms-enclave-26.webp",
    "/images/common/ms-enclave-27.webp",
    "/images/common/ms-enclave-24.webp",
    "/images/common/ms-enclave-25.webp",
    "/images/common/ms-enclave-26.webp",
    "/images/common/ms-enclave-27.webp",
    "/images/common/ms-enclave-24.webp",
    "/images/common/ms-enclave-25.webp",
    "/images/common/ms-enclave-26.webp",
    "/images/common/ms-enclave-27.webp",
  ];

  return (
    <section className="py-10 px-0 md:px-25 ">
      <div className="flex flex-col lg:flex-row">
        <div className="flex items-center">
          <div className="px-6 mb-5">
            <h2 className="text-5xl font-semibold text-yellow-100  leading-tight text-shadow-sm">
            Comfortable & Spacious Accommodations
          </h2>
          <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mb-12 mt-3">
            Whether you are traveling with family, friends, or as a couple, our rooms are designed to suit every need. Spacious interiors, soothing surroundings, and modern conveniences ensure a comfortable stay in the heart of nature.
          </p>
          <Link
            href="/gallery"
            className="inline-block px-10 rounded shadow-lg py-3 bg-white text-black hover:animate-bounce"
          >
            View All Gallery
          </Link>
          </div>
        </div>
        <div className="lg:max-w-5xl lg:mx-auto px-4">
          {/* Main Slider */}
          <Swiper
            spaceBetween={10}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Pagination, Thumbs, Autoplay]}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={src}
                  width={1200}
                  height={700}
                  alt="Gallery Image"
                  className="w-full h-[400px] object-cover rounded-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail Slider */}
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={6}
            freeMode
            watchSlidesProgress
            spaceBetween={10}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[FreeMode, Thumbs, Autoplay]}
            className="mt-5"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={src}
                  width={200}
                  height={120}
                  alt="Thumbnail"
                  className="h-20 w-full object-cover rounded cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
