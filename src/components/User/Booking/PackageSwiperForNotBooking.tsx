"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSnowflake,
  faBed,
  faWifi,
  faTv,
  faUtensils,
  faBathtub,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";
import Loader from "@/components/common/Loader";

/* ================= MOTION VARIANTS ================= */

const fadeLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const fadeRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

/* ================= COMPONENT ================= */

const PackageSwiperForNotBooking = () => {
  const { data: session, status } = useSession();
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const res = await axios.get("/api/packages");
        let pkgs = res.data.data || [];
        pkgs = [...pkgs, ...pkgs, ...pkgs];
        setPackages(pkgs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  /* ================= LOADER ================= */

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <section className="py-5">
      <div className="mx-auto  min-h-[500px]">
        {/* ================= SWIPER ================= */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="col-span-2"
        >
          <Swiper
            style={{ padding: "10px" }}
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="relative w-full  rounded-md"
          >
            {packages.map((pkg, index) => (
              <SwiperSlide key={index}>
                <div className="group bg-[#f3faf8] min-h-[400px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition h-full">
                  {/* IMAGE */}
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.packageName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* HOVER ICONS */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <Amenity icon={faSnowflake} />
                      <Amenity icon={faBed} />
                      <Amenity icon={faWifi} />
                      <Amenity icon={faTv} />
                      <Amenity icon={faUtensils} />
                      <Amenity icon={faBathtub} />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 text-black flex flex-col justify-between ">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        {pkg.packageName}
                      </h2>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-dm">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold">
                        ₹{pkg.indianPrice}
                        <span className="text-sm font-normal text-gray-500">
                          /Night
                        </span>
                      </p>

                      <Link
                        href={`/packages/${pkg.slug}`}
                        className="bg-black hover:bg-yellow-500 text-white px-4 py-2 rounded-full text-sm transition"
                      >
                        Room Details
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default PackageSwiperForNotBooking;

/* ================= AMENITY ICON ================= */

function Amenity({ icon }: any) {
  return (
    <div className="flex flex-col items-center p-2 rounded-full text-gray-700 bg-white text-sm shadow-lg">
      <FontAwesomeIcon icon={icon} className="text-md mb-1" />
    </div>
  );
}
