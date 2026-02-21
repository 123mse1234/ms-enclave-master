"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const amenities = [
  { imageUrl: "/images/common/ms-enclave-24.webp", title: "Well-Furnished Rooms" },
  { imageUrl: "/images/new/ms-enclave-conference-hall.webp", title: "Party Hall" },
  { imageUrl: "/images/new/ms-enclave-out-side-with-pool.webp", title: "Swimming Pool" },
  { imageUrl: "/images/new/ms-enclave-inside-rain.webp", title: "Artificial Rain" },
  { imageUrl: "/images/new/ms-enclave-billiards.webp", title: "Indoor Games" },
];

export default function AmenitiesSlider() {
  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-semibold text-yellow-100  leading-tight text-shadow-sm">
          Discover Our World-Class Amenities
        </h2>
        <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mb-12 mt-3">
          At M.S. Enclave Heritage Resort, we offer thoughtfully curated amenities to make your stay unforgettable.
From luxurious rooms and a sparkling swimming pool to kids’ play areas and serene walking tracks, our resort ensures that every guest experiences comfort, leisure, and adventure all in one place.
        </p>
      </div>

      <div className="mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1.5 },
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 3.5 },
            1024: { slidesPerView: 3.2 },
          }}
        >
          {amenities.map((item, index) => (
            <SwiperSlide key={index}>
              <Link href="/amenities" className="block">
                <div className="bg-white rounded shadow-lg overflow-hidden transition-transform hover:scale-105 ">
                  <div className="w-full h-80 relative">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover brightness-110"
                    />
                    <h3 className="text-white text-lg font-dm capitalize text-shadow-lg bottom-0 absolute font-semibold text-center p-4">
                    {item.title}
                  </h3>
                  </div>
                  
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-10">
          <Link href="/amenities">
            <button className="mt-6 inline-block px-10 rounded shadow-lg py-3 bg-white text-black hover:animate-bounce ">
              View All Amenities
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
