"use client";

import { useState, useRef } from "react";
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
import { motion, useInView } from "framer-motion";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

const fadeLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const fadeRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const MotionLink = motion(Link);

export default function RoomsPreviewSection() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const contentRef = useRef(null);
  const sliderRef = useRef(null);

  const contentInView = useInView(contentRef, { amount: 0.3 });
  const sliderInView = useInView(sliderRef, { amount: 0.3 });

  const images = [
    "/images/common/ms-enclave-24.webp",
    "/images/common/ms-enclave-26.webp",
    "/images/common/ms-enclave-27.webp",
    "/images/common/ms-enclave-24.webp",
    "/images/common/ms-enclave-26.webp",
    "/images/common/ms-enclave-27.webp",
    "/images/common/ms-enclave-24.webp",
    "/images/common/ms-enclave-26.webp",
    "/images/common/ms-enclave-27.webp",
  ];

  return (
    <section className="py-10 px-0 md:px-2 overflow-hidden">
      <div className="flex flex-col lg:flex-row">

        {/* LEFT CONTENT */}
        <motion.div
          ref={contentRef}
          variants={fadeLeft}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          transition={{ duration: 1 }}
          className="flex items-center"
        >
          <div className="px-6 mb-5">
           <h2 className="text-5xl font-semibold text-gray-200 leading-tight font-playfair">
            Our Rooms
           </h2>
            <p className="text-6xl font-semibold text-amber-100 leading-tight text-shadow-sm mt-2">
              Comfortable Spacious Rooms
            </p>

            <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm">
              Experience comfort in our thoughtfully designed rooms that reflect Kerala’s heritage style while offering modern amenities for a relaxing stay.
            </p>

            <MotionLink
              href="/amenities/rooms"
              variants={fadeLeft}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              transition={{ duration: 1.3 }}
              className="mt-6 inline-block px-8 py-3 rounded-md shadow-md bg-gray-950 text-white hover:animate-bounce"
            >
              View All Rooms
            </MotionLink>
          </div>
        </motion.div>

        {/* RIGHT SLIDER */}
        <motion.div
          ref={sliderRef}
          variants={fadeRight}
          initial="hidden"
          animate={sliderInView ? "visible" : "hidden"}
          transition={{ duration: 1 }}
          className="lg:max-w-5xl lg:mx-auto px-4"
        >
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
        </motion.div>

      </div>
    </section>
  );
}
