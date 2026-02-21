"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import Link from "next/link";

const activities = [
  {
    title: "Cycling",
    description:
      "Enjoy a peaceful cycling experience through scenic village roads and natural surroundings. Ride past lush greenery, open fields, and quiet pathways at your own pace. Cycling offers a refreshing way to explore the beauty around the resort. Ideal for fitness lovers and nature enthusiasts alike.",
    image: "/images/activities/ms-enclave-palakkad-activity-cycling.webp",
  },
  {
    title: "Village Experience",
    description:
      "Immerse yourself in authentic Kerala village life. Experience local culture, simple living, and warm hospitality rooted in timeless traditions.",
    image: "/images/activities/ms-enclave-palakkad-activity-village-experience.webp",
  },
  {
    title: "Nature Walk",
    description:
      "Step into lush greenery and explore scenic walking paths around the resort. Ideal for morning and evening strolls, offering peace, fresh air, and calming views.",
    image: "/images/activities/ms-enclave-palakkad-activity-nature-walk.webp",
  },
  {
    title: "Fishing",
    description:
      "Relax beside calm waters and enjoy the simplicity of traditional fishing in a peaceful village setting. Surrounded by natural beauty, this activity offers a quiet escape from daily routines. Perfect for guests who love slow living and mindful moments.",
    image: "/images/activities/ms-enclave-palakkad-activity-fishing.webp",
  },
  {
    title: "Kids Play Area",
    description:
      "Our kids play area is designed to keep children active, safe, and entertained outdoors. Parents can relax knowing their children are secure. A joyful space for family bonding and happy memories.",
    image: "/images/activities/ms-enclave-palakkad-activity2.webp",
  },
  {
    title: "Photography Spots",
    description:
      "Beautiful heritage architecture and natural landscapes make the resort ideal for photography. Capture timeless moments and scenic beauty during your stay.",
    image: "/images/activities/ms-enclave-palakkad-activity2.webp",
  },
];

export default function ActivitiesSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-10 overflow-hidden">
      {/* 🔹 CONTENT */}
      <div className="relative z-10 mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-10 items-center  rounded-3xl shadow-xl overflow-hidden">
          
          {/* LEFT – IMAGE SWIPER */}
          <div className="relative h-[600px] md:col-span-4">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              onSlideChange={(swiper) =>
                setActiveIndex(swiper.realIndex)
              }
              className="h-full"
            >
              {activities.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-full w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* RIGHT – TEXT CONTENT */}
          <div className="p-8 md:p-12 max-w-7xl md:col-span-6 ">
            <div className="text-center mb-14">
              <h2 className="text-[50px] font-semibold text-amber-100 leading-tight text-shadow-xl mt-3">
                Activities & Experiences
              </h2>
              <p className="text-gray-50 font-medium text-lg leading-relaxed font-dm mt-2">
                Simple pleasures inspired by nature and village life,
                creating memorable moments throughout your stay.
              </p>
              <Link
              href="/packages"
              className="mt-6 inline-block px-10 rounded shadow-lg py-3 bg-white text-black hover:animate-bounce  "
            >
             Explore Our Activities
            </Link>
            </div>

            <p className="text-sm text-gray-50 mb-4 tracking-widest">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(activities.length).padStart(2, "0")}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-3xl md:text-4xl font-semibold text-yellow-100 mb-6 font-dm">
                  {activities[activeIndex].title}
                </h3>

                <p className="text-gray-50 font-medium text-md leading-relaxed font-dm mt-2 line-clamp-4">
                  {activities[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
            
          </div>
        </div>
      </div>
    </section>
  );
}
