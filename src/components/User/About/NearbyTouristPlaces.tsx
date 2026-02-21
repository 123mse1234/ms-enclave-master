"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  Parallax,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import Image from "next/image";
import Link from "next/link";

type Place = {
  title: string;
  description: string;
  image: string;
  distance: string;
  mapUrl: string;
};

const places: Place[] = [
  {
    title: "Silent Valley National Park",
    description:
      "One of India’s most pristine tropical rainforests, Silent Valley National Park is a paradise for nature lovers and wildlife enthusiasts. Home to rare flora and fauna, this UNESCO-recognized biosphere offers guided treks, bird watching, and an unforgettable experience of untouched wilderness.",
    image: "/images/tourist/silent-valley.webp",
    distance: "61 km",
    mapUrl: "https://share.google/pR6HNjttDLcwZfD8Z",
  },
  {
    title: "Nelliyampathy Hills Station",
    description:
      "Nestled in the Western Ghats, Nelliyampathy is a picturesque hill station known for its cool climate, tea and coffee plantations, dense forests, and breathtaking viewpoints. Ideal for a peaceful day trip, the hills offer stunning sunrise and sunset views.",
    image: "/images/tourist/nelliyampathy.webp",
    distance: "37 km",
    mapUrl: "https://share.google/xUSaTJ1KnwhY46M6f",
  },
  {
    title: "Malampuzha Dam, Fantasy Park",
    description:
      "A perfect full-day outing destination, Malampuzha features a massive dam surrounded by lush gardens. Visitors can enjoy boat rides, children’s amusement rides at Fantasy Park, ropeway views.",
    image: "/images/tourist/Malampuzha.jpg",
    distance: "28 km",
    mapUrl: "https://share.google/HYPpMord7RopCuGLb",
  },
  {
    title: "Kava View Point",
    description:
      "Kava View Point is a popular natural attraction offering wide-open views of green fields, rolling hills, and misty landscapes. The peaceful atmosphere makes it an ideal spot for photography, short hikes, and enjoying nature’s beauty.",
    image: "/images/tourist/kava-view-point.webp",
    distance: "39 km",
    mapUrl: "https://share.google/5vuhTctx39OXrnqdv",
  },
  {
    title: "Palakkad Fort",
    description:
      "Palakkad Fort is a well-preserved historical landmark showcasing Kerala’s rich heritage. With museum exhibits, ancient architecture, and open grounds, the fort offers visitors a glimpse into the region’s cultural and historical past.",
    image: "/images/tourist/palakkad-fort.jpg",
    distance: "23 km",
    mapUrl: "https://share.google/6fJ5TTSiVWEkv4uh0",
  },
];

export default function NearbyTouristPlaces() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl">
        {/* TITLE */}
        <h2 className="text-5xl mt-3 font-semibold text-amber-100 leading-tight text-shadow-sm text-center">
          Nearby Tourist Places
        </h2>
        <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mb-12 mt-3 text-center">Explore the Natural Beauty, Heritage, and Attractions Around M.S. Enclave Heritage Resort</p>

        {/* SWIPER */}
        <Swiper
          modules={[
            Autoplay,
            Navigation,
            Pagination,
            EffectFade,
            Parallax,
          ]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // ✅ Pause on hover
          }}
          pagination={{ clickable: true }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          parallax
          className="relative min-h-[500px]"
        >

          {places.map((place, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* IMAGE */}
                <div className="relative h-[450px] lg:h-[450px] w-full rounded-tl-[35px] rounded-bl-[35px] shadow-md pb-2 pl-2">
                  <Image
                    src={place.image}
                    alt={place.title}
                    fill
                    className="object-cover shadow-md rounded"
                    data-swiper-parallax="-20%" // ✅ Parallax
                    priority={index === 0}
                  />

                  {/* DISTANCE BADGE */}
                  <span className="absolute top-4 left-4 bg-black/70 text-white text-sm px-4 py-1 rounded-full">
                    {place.distance} from resort
                  </span>
                </div>

                {/* TEXT */}
                <div data-swiper-parallax="-100" className="px-6 flex flex-col justify-center gap-6 py-5">
                  <h3 className="text-3xl text-yellow-100 text-shadow-xl  font-bold mb-3">
                    {place.title}
                  </h3>

                  <p className="text-white font-dm leading-relaxed text-lg">
                    {place.description}
                  </p>

                  {/* GOOGLE MAP BUTTON */}
                  <Link
                    href={place.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" inline-block px-10 rounded shadow-lg py-3 w-[240px] bg-white text-black hover:animate-bounce "
                  >
                    View on Google Maps
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
