"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Loader from "@/components/common/Loader";

const STATUS_TABS = ["all", "paid", "pending", "cancelled"];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axios.get("/api/admin/bookings");
      setBookings(res.data);
      setLoading(false);
    };
    fetchBookings();
  }, []);

  // ================= FILTER LOGIC =================
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const userName =
        b.userId?.name || b.clientName || "";
      const phone =
        b.phone || b.userId?.phone || "";

      const matchSearch =
        userName.toLowerCase().includes(search.toLowerCase()) ||
        phone.includes(search);

      const matchStatus =
        status === "all" ? true : b.status === status;

      const bookingDate = new Date(b.createdAt).getTime();
      const matchFrom =
        !fromDate || bookingDate >= new Date(fromDate).getTime();
      const matchTo =
        !toDate || bookingDate <= new Date(toDate).getTime();

      return matchSearch && matchStatus && matchFrom && matchTo;
    });
  }, [bookings, search, status, fromDate, toDate]);

  // ================= STATUS UPDATE =================
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await axios.patch(`/api/admin/bookings/${id}/status`, {
        status: newStatus,
      });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: newStatus } : b
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
      <h1 className="text-5xl font-semibold text-yellow-100  leading-tight text-shadow-sm text-center ">Bookings</h1>
      <p className="text-center text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mb-12 mt-3">Access and manage all guest reservations from a single control panel. Review booking details, approve or cancel reservations, and monitor check-in and check-out schedules. Use advanced filters to sort bookings by date range, status, package type, or payment status for faster and more organized management.</p>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-[#7a0002] rounded-2xl shadow-2xl p-6 mb-6 font-dm">
  <div className="grid md:grid-cols-4 gap-5">

    {/* Search */}
    <div className="flex flex-col">
      <label className="text-md text-yellow-100 mb-1 tracking-wide">
        Search
      </label>
      <input
        type="text"
        placeholder="Name or phone number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-white text-gray-800 px-4 py-2.5 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-yellow-400
                   shadow-sm"
      />
    </div>

    {/* From Date */}
    <div className="flex flex-col">
      <label className="text-md text-yellow-100 mb-1 tracking-wide">
        From Date
      </label>
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="w-full bg-white text-gray-800 px-4 py-2.5 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-yellow-400
                   shadow-sm"
      />
    </div>

    {/* To Date */}
    <div className="flex flex-col">
      <label className="text-md text-yellow-100 mb-1 tracking-wide">
        To Date
      </label>
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className="w-full bg-white text-gray-800 px-4 py-2.5 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-yellow-400
                   shadow-sm"
      />
    </div>

    {/* Clear Button */}
    <div className="flex items-end">
      <button
        onClick={() => {
          setSearch("");
          setFromDate("");
          setToDate("");
          setStatus("all");
        }}
        className="w-full bg-yellow-100 text-black hover:animate-bounce
                    font-semibold
                   rounded-lg px-4 py-2.5
                   transition-all duration-200 shadow-md"
      >
        Clear Filters
      </button>
    </div>

  </div>
</div>

      {/* ================= STATUS TABS ================= */}
      <div className="flex flex-wrap gap-3 mb-6">
  {STATUS_TABS.map((tab) => (
    <button
      key={tab}
      onClick={() => setStatus(tab)}
      className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200
        ${
          status === tab
            ? "bg-[#7a0002] text-yellow-300 shadow-lg scale-105"
            : "bg-white text-[#7a0002] border border-[#7a0002]/30 hover:animate-bounce"
        }`}
    >
      {tab.toUpperCase()}
    </button>
  ))}
</div>

      {/* ================= TABLE ================= */}
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
      {filteredBookings.map((b) => (
        <tr
          key={b._id}
          className="border-t border-yellow-50/25 hover:bg-black/10"
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
            {b.paymentMethod ||
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

  {filteredBookings.length === 0 && (
    <p className="p-6 text-center text-gray-400">
      No bookings found
    </p>
  )}
</div>
    </div>
  );
}
