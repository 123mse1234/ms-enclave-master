"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ConfettiOverlay from "@/components/common/ConfettiOverlay";
import toast from "react-hot-toast";
import AdminBreadcrumb from "@/components/common/AdminHeader/AdminBreadcrumb";
import Loader from "@/components/common/Loader";
import Link from "next/link";

/* ================= MAIN PAGE ================= */

export default function DayAvailabilityPage() {
  const { date } = useParams();

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const [roomsToBook, setRoomsToBook] = useState(1);
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");

  const [packages, setPackages] = useState<any[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const noRooms = summary?.availableRooms === 0;

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    if (date) loadDayData();
  }, [date]);

  const loadDayData = async () => {
    setLoading(true);

    const res = await axios.get(`/api/admin/calendar-availability/${date}`);

    setSummary(res.data.summary);
    setBookings(res.data.bookings);

    // Load packages only if rooms available
    if (res.data.summary.availableRooms > 0) {
      const pkgRes = await axios.get("/api/packages");

      const pkgData = Array.isArray(pkgRes.data)
        ? pkgRes.data
        : Array.isArray(pkgRes.data.data)
          ? pkgRes.data.data
          : [];

      setPackages(pkgData);
    } else {
      setPackages([]);
    }

    setLoading(false);
  };

  /* ================= PRICE CALC ================= */

  const calculatePrice = (pkg: any, rooms: number) => {
    if (!pkg) return;

    const base = pkg.indianPrice * rooms;
    const gst = base * 0.18;
    setTotalPrice(Math.round(base + gst));
  };

  useEffect(() => {
    if (selectedPackage) {
      calculatePrice(selectedPackage, roomsToBook);
    }
  }, [roomsToBook, selectedPackage]);

  /* ================= ADMIN BOOKING ================= */

  const handleAdminBooking = async () => {
    if (!clientName || !phone || !selectedPackage) {
      toast.error("Please fill all fields");
      return;
    }

    await axios.post("/api/admin/manual-booking", {
      date,
      rooms: roomsToBook,
      clientName,
      phone,
      packageId: selectedPackage._id,
      totalPrice,
    });

    setShowConfetti(true);
    toast.success("Room booked successfully");

    setClientName("");
    setPhone("");
    setRoomsToBook(1);
    setSelectedPackage(null);
    setTotalPrice(0);

    loadDayData();
  };

  if (loading) {
    return <Loader />;
  }
  if (!summary) return <p className="p-6 text-red-600">No data</p>;

  /* ================= UI ================= */

  return (
    <section>
      {/* 🎉 CONFETTI */}
      {showConfetti && <ConfettiOverlay show={showConfetti} />}
      <div className="max-w-7xl mx-auto p-6 text-white mt-5">
        <h1 className="text-5xl font-dm font-semibold text-yellow-100  leading-tight text-shadow-sm text-center ">
          Reservation :{" "}
          <span className=" font-semibold text-yellow-100  leading-tight text-shadow-sm text-center ">
            {date}
          </span>
        </h1>

        <p className="text-center text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">
          Track bookings by date, view check-ins and check-outs, and manage room
          occupancy with ease. Use the calendar to filter and organize
          reservations, and quickly add new bookings directly as an admin for
          offline or manual entries.
        </p>
      </div>
      <div className="max-w-6xl mx-auto p-6">
        {/* SUMMARY */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <SummaryCard title="Total Rooms" value={summary.totalRooms} />
          <SummaryCard title="Booked Rooms" value={summary.bookedRooms} />
          <SummaryCard title="Available Rooms" value={summary.availableRooms} />
        </div>

        {/* ADMIN BOOKING */}
        <div className="bg-[#7a0002] rounded-2xl shadow-2xl p-6 mb-6 border  border-yellow-100/10">
          <h2 className="text-4xl text-shadow-xl text-yellow-100 font-semibold mb-8 text-center">
            Admin Manual Booking
          </h2>

          <div className="space-y-4 font-dm">
            {/* ROW 1 → Client Name + Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-md text-yellow-100 mb-1 tracking-wide">
                  Client Name
                </label>
                <input
                  disabled={noRooms}
                  placeholder="Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-white text-gray-800 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-md text-yellow-100 mb-1 tracking-wide">
                  Phone Number
                </label>
                <input
                  disabled={noRooms}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white text-gray-800 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
                />
              </div>
            </div>

            {/* ROW 2 → Package + Rooms + Button */}
            <div className="grid md:grid-cols-3 gap-4 items-end">
              <div className="flex flex-col">
                <label className="text-md text-yellow-100 mb-1 tracking-wide">
                  Package
                </label>
                <select
                  disabled={noRooms}
                  className="w-full bg-white text-gray-800 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
                  value={selectedPackage?._id || ""}
                  onChange={(e) => {
                    const pkg = packages.find((p) => p._id === e.target.value);
                    setSelectedPackage(pkg);
                  }}
                >
                  <option value="">Select Package</option>
                  {packages.map((pkg) => (
                    <option key={pkg._id} value={pkg._id}>
                      {pkg.packageName} – ₹{pkg.indianPrice}/room
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-md text-yellow-100 mb-1 tracking-wide">
                  Number of Rooms
                </label>
                <input
                  type="number"
                  min={1}
                  max={summary.availableRooms}
                  disabled={noRooms}
                  value={roomsToBook}
                  onChange={(e) => setRoomsToBook(Number(e.target.value))}
                  className="w-full bg-white text-gray-800 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
                />
              </div>

              <button
                disabled={
                  noRooms ||
                  !clientName ||
                  !phone ||
                  !selectedPackage ||
                  roomsToBook > summary.availableRooms
                }
                onClick={handleAdminBooking}
                className="bg-green-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
              >
                Book
              </button>
            </div>
          </div>

          {selectedPackage &&
            !noRooms &&
            (() => {
              const pricePerNight = selectedPackage.indianPrice;
              const baseAmount = pricePerNight * roomsToBook;

              const gstRate = pricePerNight < 7500 ? 0.05 : 0.18;
              const gstAmount = baseAmount * gstRate;
              const total = baseAmount + gstAmount;

              return (
                <div className="mt-4 p-4 font-dm">
                  <p>Base: ₹{baseAmount}</p>

                  <p>
                    GST ({gstRate * 100}%): ₹{gstAmount.toFixed(2)}
                  </p>

                  <p className="font-bold">Total: ₹{total.toFixed(2)}</p>
                </div>
              );
            })()}
        </div>

        {/* BOOKINGS LIST */}
        <div className="overflow-x-auto bg-[#7a0002] rounded-2xl shadow-2xl p-6 mb-6 font-dm">
          <table className="min-w-full text-md">
            <thead className="text-yellow-100">
              <tr>
                <th className="p-3 text-center">Package</th>
                <th className="p-3 text-center">Guest</th>
                <th className="p-3 text-center">Dates</th>
                <th className="p-3 text-center">Total</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Payment</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b._id}
                  className="border-t border-yellow-50/25 hover:bg-black/10 capitalize"
                >
                  <td className="p-3 text-center font-medium">
                    {b.packageId?.packageName}
                  </td>

                  <td className="p-3 text-center">
                    <p>{b.userId?.name || b.clientName || "Guest"}</p>
                    <p className="text-xs text-gray-400">{b.phone}</p>
                  </td>

                  <td className="p-3 text-center">
                    {new Date(b.checkInDate).toLocaleDateString()} →{" "}
                    {new Date(b.checkOutDate).toLocaleDateString()}
                  </td>

                  <td className="p-3 text-center font-semibold">
                    ₹{b.totalPrice}
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        b.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : b.status === "pending"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    {b.paymentMethod === "admin-manual"
                      ? "Admin"
                      : b.paymentMethod ||
                        (b.razorpayPaymentId ? "Razorpay" : "N/A")}
                  </td>

                  <td className="p-3 text-center">
                    <Link
                      href={`/admin/bookings/${b._id}`}
                      className="border px-2 py-1 rounded text-xs"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedBooking && (
          <BookingModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </div>
    </section>
  );
}

/* ================= MODAL ================= */

function BookingModal({ booking, onClose }: any) {
  return (
    <div
      className="fixed inset-0 bg-black/50 text-black flex items-center justify-center z-50"
      onClick={onClose} // 👈 click outside = close
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()} // 👈 prevent close when clicking inside
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-xl">
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4">📄 Booking Details</h2>

        <div className="space-y-2 text-black">
          <p>
            <strong>Customer:</strong> {booking.userId?.name}
          </p>
          <p>
            <strong>Email:</strong> {booking.userId?.email}
          </p>

          <p>
            <strong>Package:</strong> {booking.packageId?.packageName}
          </p>
          <p>
            <strong>Rooms:</strong> {booking.roomsNeeded}
          </p>
          <p>
            <strong>Adults:</strong> {booking.adults}
          </p>
          <p>
            <strong>Children:</strong> {booking.children}
          </p>

          <p>
            <strong>Check-in:</strong>{" "}
            {new Date(booking.checkInDate).toDateString()}
          </p>
          <p>
            <strong>Check-out:</strong>{" "}
            {new Date(booking.checkOutDate).toDateString()}
          </p>

          <p>
            <strong>Nights:</strong> {booking.nights}
          </p>
          <p>
            <strong>Total Price:</strong> ₹{booking.totalPrice}
          </p>
          <p>
            <strong>Status:</strong> {booking.status}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= CARD ================= */

function SummaryCard({ title, value }: any) {
  return (
    <div className="bg-[#7a0002] rounded-2xl shadow-2xl p-6 mb-6 border border-yellow-100/10 text-center font-dm">
      <p className="text-yellow-100">{title}</p>
      <p className="text-4xl mt-2 font-bold text-white">{value}</p>
    </div>
  );
}
