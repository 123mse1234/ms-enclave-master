"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  unAuthenticateUserProfile,
  validateUserProfile,
} from "@/utils/validateUserProfile";
import RoomHighlights from "../../Booking/RoomHighlights";
import RoomRules from "../../Booking/RoomRules";
import Amenities from "../../Booking/Amenities";
import LoginButton from "../../Profile/LoginButton";

type PackageDetailsProps = {
  onTitleLoad?: (title: string) => void;
};

export default function PackageDetails({ onTitleLoad }: PackageDetailsProps) {
  const { data: session, status } = useSession();
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [pkg, setPkg] = useState<any>(null);
  const [nights, setNights] = useState(1);

  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    adults: "",
    children: "",
    date: today,
  });

  const fetchAvailability = async (date: string, nights: number) => {

    if (!pkg?._id) return;

    const res = await axios.get("/api/bookings/availability", {
      params: {
        packageId: pkg._id,
        checkIn: date,
        nights,
      },
    });

    setMaxAvailableRooms(res.data.availableRooms);
    toast.success(`${date} have ${res.data.availableRooms} Rooms `);
  };

  const [maxAvailableRooms, setMaxAvailableRooms] = useState(0);

  // 1️⃣ Fetch package
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`/api/packages/${slug}`);
        setPkg(res.data.data);
        setLoading(false);

        if (pkg?.packageName) {
          onTitleLoad?.(pkg.packageName);
        }

        if (!session?.user) {
          unAuthenticateUserProfile();
        }
      } catch (err) {
        setLoading(false);
      }
    };

    if (slug) loadData();
  }, [slug]);

  // 2️⃣ Fetch availability AFTER pkg is set
  useEffect(() => {
    if (!pkg?._id) return;
    fetchAvailability(form.date, Number(nights));
  }, [pkg?._id, form.date, nights]);

  if (loading) return <p className="p-10">Loading package...</p>;
  if (!pkg) return <p className="p-10 text-red-600">Package not found.</p>;

  return (
    <div>
      <div className="mb-7 grid gap-6 md:grid-cols-3 md:items-center">
          {/* LEFT SIDE */}
          <div className="min-w-0 md:col-span-2">
            <h1 className="text-5xl font-semibold text-yellow-100 leading-tight text-shadow-sm break-words">
              {pkg.packageName}
            </h1>

            <p className="text-2xl text-white font-dm text-shadow-sm">
              ₹ {pkg.indianPrice} / Night
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-1 flex flex-col items-start md:items-end">
            {session?.user ? (
              <Link
                href={`/booking/${pkg.slug}`}
                className="mt-6 inline-block px-7 rounded shadow-lg py-3 bg-white text-black hover:animate-bounce"
              >
                Book Now
              </Link>
            ) : (
              <div className="text-center md:text-right">
                <LoginButton />
                <p className="text-red-500 text-xs mt-2 font-dm font-medium">
                  Login to Book Your Room
                </p>
              </div>
            )}
          </div>
        </div>

      <div>
        <div className="relative w-full h-96 overflow-hidden rounded-md transition">
          <Image
            src={pkg.image}
            alt={pkg.packageName}
            fill
            className="object-cover rounded-lg shadow"
          />
        </div>

        <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mb-12 mt-3">
          {pkg.description}
        </p>

        <RoomHighlights
          beds={1}
          bedType="King Size Bed"
          maxAdults={pkg.maxAdults}
          maxChildren={pkg.maxChildren}
          roomSize="45 sqm"
        />
        <RoomRules />
        <Amenities />
      </div>
    </div>
  );
}
