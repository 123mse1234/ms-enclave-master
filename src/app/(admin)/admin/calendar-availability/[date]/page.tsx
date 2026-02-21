"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ConfettiOverlay from "@/components/common/ConfettiOverlay";
import toast from "react-hot-toast";
import AdminBreadcrumb from "@/components/common/AdminHeader/AdminBreadcrumb";

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

    const res = await axios.get(
      `/api/admin/calendar-availability/${date}`
    );

    setSummary(res.data.summary);
    setBookings(res.data.bookings);

    // Load packages only if rooms available
    if (res.data.summary.availableRooms > 0) {
      const pkgRes = await axios.get("/api/packages");

      const pkgData =
        Array.isArray(pkgRes.data)
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

  if (loading) return <p className="p-6">Loading...</p>;
  if (!summary) return <p className="p-6 text-red-600">No data</p>;

  /* ================= UI ================= */

  return (
    <section>
      {/* 🎉 CONFETTI */}
   {showConfetti && (
  <ConfettiOverlay show={showConfetti} />


)}
<AdminBreadcrumb
        heading={`Availability ${date}`}
        bgImage="/images/common/ms-enclave-31.webp" // ⭐ background image
        items={[{ label: "All Packages", href: "/amenities/party-hall" }]}
      />
    <div className="max-w-6xl mx-auto p-6">
      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <SummaryCard title="Total Rooms" value={summary.totalRooms} />
        <SummaryCard title="Booked Rooms" value={summary.bookedRooms} />
        <SummaryCard title="Available Rooms" value={summary.availableRooms} />
      </div>

      {/* ADMIN BOOKING */}
      <div className="border rounded-lg p-6 mb-10 bg-gray-50 text-black">
        <h2 className="text-xl font-semibold mb-4">
          🛎 Admin Manual Booking
        </h2>

        <div className="grid md:grid-cols-5 gap-4 items-end">
          <input
            disabled={noRooms}
            placeholder="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            disabled={noRooms}
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded"
          />

          <select
            disabled={noRooms}
            className="border p-2 rounded"
            value={selectedPackage?._id || ""}
            onChange={(e) => {
              const pkg = packages.find(
                (p) => p._id === e.target.value
              );
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

          <input
            type="number"
            min={1}
            max={summary.availableRooms}
            disabled={noRooms}
            value={roomsToBook}
            onChange={(e) => setRoomsToBook(Number(e.target.value))}
            className="border p-2 rounded"
          />

          <button
            disabled={
              noRooms ||
              !clientName ||
              !phone ||
              !selectedPackage ||
              roomsToBook > summary.availableRooms
            }
            onClick={handleAdminBooking}
            className="bg-blue-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
          >
            Book
          </button>
        </div>

        {selectedPackage && !noRooms && (
          <div className="mt-4 p-4 bg-white border rounded">
            <p>
              Base: ₹{selectedPackage.indianPrice * roomsToBook}
            </p>
            <p>
              GST (18%): ₹
              {(selectedPackage.indianPrice * roomsToBook * 0.18).toFixed(2)}
            </p>
            <p className="font-bold">
              Total: ₹{totalPrice}
            </p>
          </div>
        )}
      </div>

      {/* BOOKINGS LIST */}
      <table className="w-full border text-black">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Customer</th>
            <th className="p-3 border">Rooms</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td className="p-3 border">{b.userId?.name || "Admin"}</td>
              <td className="p-3 border">{b.roomsNeeded}</td>
              <td className="p-3 border">{b.status}</td>
              <td className="p-3 border text-center">
                <button
                  onClick={() => setSelectedBooking(b)}
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
    <div className="p-6 rounded shadow bg-white text-black text-center">
      <p>{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
