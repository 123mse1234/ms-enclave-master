"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { galleryImages } from "./galleryList";


export default function GalleryIntroduction() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-20 overflow-hidden bg-gray-50">

      {/* 🔹 CONTENT */}
      <div className="relative z-10  mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center bg-white overflow-hidden">
          
          {/* Left*/}
          <div className="p-8 md:p-12 md:col-span-2">
            <div className="text-center mb-14">
              <h2 className="text-5xl font-semibold text-yellow-100  leading-tight text-shadow-sm">
                Moments of Serenity & Heritage
              </h2>
              <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">
                Discover the beauty of M.S. Enclave Heritage Resort through our curated collection of images. From traditional architecture to peaceful natural surroundings, every frame captures the charm, comfort, and warmth of an authentic Kerala retreat.
              </p>
            </div>
          </div>
            {/* Right */}
          <div className="relative h-[300px] md:h-[600px] md:col-span-3 ">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              onSlideChange={(swiper) =>
                setActiveIndex(swiper.realIndex)
              }
              className="h-full"
            >
              {galleryImages.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-full w-full shadow">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover brightness-125 contrast-100 rounded-bl-2xl rounded-tl-2xl "
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
