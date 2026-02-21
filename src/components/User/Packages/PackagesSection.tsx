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
import { useSession } from "next-auth/react";
import { Bars } from "react-loader-spinner";
import Loader from "@/components/common/Loader";


export default function PackagesSection() {
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

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="grid md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
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
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= AMENITY ICON ================= */

function Amenity({ icon, label }: any) {
  return (
    <div className="flex flex-col items-center p-2 rounded-full text-gray-700 bg-white text-sm shadow-lg">
      <FontAwesomeIcon icon={icon} className="text-md mb-1" />
    </div>
  );
}
