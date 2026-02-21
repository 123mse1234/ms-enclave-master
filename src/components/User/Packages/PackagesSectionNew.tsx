"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSnowflake,
  faBed,
  faWifi,
  faTv,
  faUtensils,
  faBathtub,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useSession } from "next-auth/react";
import { Bars } from "react-loader-spinner";


export default function PackagesSectionNew() {
  const { data: session, status } = useSession();
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const res = await axios.get("/api/packages");
        setPackages(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  if (loading)
  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center gap-4">
  <Bars
    height="80"
    width="80"
    color="#000"
    ariaLabel="bars-loading"
    visible={true}
  />
  <p className="text-md text-black text-shadow-md animate-pulse">
    Please wait, loading...
  </p>
</div>

  );

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
          {packages.map((pkg, i) => (
              <SwiperSlide
            key={pkg._id}
            className="group bg-[#f3faf8] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
          >
            {/* IMAGE */}
            <div className="relative h-72 overflow-hidden">
              <Image
                src={pkg.image}
                alt={pkg.packageName}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
              />

              {/* HOVER ICONS */}
              <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-center gap-1 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <Amenity icon={faSnowflake} />
                <Amenity icon={faBed} />
                <Amenity icon={faWifi} />
                <Amenity icon={faTv} />
                <Amenity icon={faUtensils} />
                <Amenity icon={faBathtub} />
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5 text-black">
              <h2 className="text-xl font-semibold mb-2">{pkg.packageName}</h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-dm">
                {pkg.description}
              </p>

              <div className="flex items-center justify-between">
                {session?.user ? (
                  <p className="text-lg font-bold">
                    ₹{pkg.indianPrice}
                    <span className="text-sm font-normal text-gray-500">
                      /Night
                    </span>
                  </p>
                ) : (
                  <div>
                    <p className="text-lg font-bold">
                      {pkg.indianPrice}{" "}
                      <span className="text-sm font-normal text-gray-500">
                        /Night
                      </span>
                    </p>
                  </div>
                )}

                <Link
                  href={`/packages/${pkg.slug}`}
                  className="bg-black hover:bg-yellow-500 text-white px-4 py-2 rounded-full text-sm transition"
                >
                  Room Details
                </Link>
              </div>
            </div>
          </SwiperSlide>
          ))}
        </Swiper>

        
      </div>
    </section>
  );
};

/* ================= AMENITY ICON ================= */

function Amenity({ icon, label }: any) {
  return (
    <div className="flex flex-col items-center p-2 rounded-full text-gray-700 bg-white text-sm shadow-lg">
      <FontAwesomeIcon icon={icon} className="text-md mb-1" />
    </div>
  );
}
