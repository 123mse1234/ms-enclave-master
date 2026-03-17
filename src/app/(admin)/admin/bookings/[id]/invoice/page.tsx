"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function AdminBookingInvoicePage() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        const res = await axios.get(`/api/admin/bookings/${id}`);
        setBooking(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load invoice");
        router.push("/admin/bookings");
      } finally {
        setLoading(false);
      }
      
    };

    fetchBooking();
  }, [id, router]);

  if (loading) return <p className="text-center mt-10">Loading invoice...</p>;
  if (!booking) return <p className="text-center mt-10">Invoice not found.</p>;

  const totalGuests = booking.adults + booking.children;

  return (
    <div className="invoice-page min-h-screen py-16  from-[#7a0002] via-[#5a0001] to-black font-dm">
  <div
    id="invoice-print"
    className="max-w-4xl mx-auto bg-white text-black rounded-2xl shadow-2xl p-10"
  >
    {/* HEADER */}
    <div className="flex justify-between items-start border-b pb-6 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-wide">
          BOOKING INVOICE
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Invoice ID: #{booking._id}
        </p>
        <p className="text-sm text-gray-500">
          Date: {new Date(booking.createdAt).toLocaleDateString()}
        </p>
      </div>

      <Image
        src="/ms-enclave-logo1.PNG"
        alt="M.S. Enclave Heritage Resort Logo"
        width={130}
        height={70}
      />
    </div>

    {/* CUSTOMER + BOOKING GRID */}
    <div className="grid md:grid-cols-2 gap-10 mb-10">

      {/* CUSTOMER DETAILS */}
      <section>
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
          Customer Details
        </h2>

        <div className="space-y-2 text-sm Customer Details">
          <p><span className="font-medium">Name:</span> {booking.user?.name || booking.clientName}</p>
          <p><span className="font-medium">Email:</span> {booking.user?.email || "N/A"}</p>
          <p><span className="font-medium">Phone:</span> {booking.phone}</p>
          <p><span className="font-medium">Nationality:</span> {booking.user?.nationality || "N/A"}</p>
        </div>
      </section>

      {/* BOOKING DETAILS */}
      <section>
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
          Booking Details
        </h2>

        {(() => {
  const pricePerNight = booking.package?.indianPrice || 0;

  // GST Slab Rule
  const gstRate = pricePerNight < 7500 ? 0.05 : 0.18;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });

  return (
    <div className="space-y-2 text-sm capitalize">
      <p>
        <span className="font-medium">Package:</span>{" "}
        {booking.package?.packageName}
      </p>

      <p>
        <span className="font-medium">Price:</span> ₹{pricePerNight} / Night + GST ({gstRate * 100}%)
      </p>

      <p>
        <span className="font-medium">Stay:</span>{" "}
        {formatDate(booking.checkInDate)} →{" "}
        {formatDate(booking.checkOutDate)}
      </p>

      <p>
        <span className="font-medium">Rooms:</span> {booking.roomsNeeded}
      </p>

      <p>
        <span className="font-medium">Guests:</span> {totalGuests}
      </p>
    </div>
  );
})()}
      </section>

    </div>

    {/* PAYMENT SUMMARY */}
    <section className="mb-10">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">
        Payment Summary
      </h2>

      <div className="bg-gray-50 rounded-xl p-6 space-y-3 text-sm">

        <div className="flex justify-between">
          <span>Room Charges</span>
          <span>₹{booking.totalPrice}</span>
        </div>

        <div className="flex justify-between text-gray-500">
          <span>Taxes & Fees</span>
          <span>Included</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Total Amount</span>
          <span>₹{booking.totalPrice}</span>
        </div>

        <div className="pt-3">
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`font-semibold ${
                booking.status === "paid"
                  ? "text-green-600"
                  : booking.status === "pending"
                  ? "text-orange-500"
                  : "text-red-600"
              }`}
            >
              {booking.status.toUpperCase()}
            </span>
          </p>

          <p>
            <span className="font-medium">Payment Method:</span>{" "}
            {booking.paymentMethod || "N/A"}
          </p>
        </div>
      </div>
    </section>

    {/* FOOTER */}
    <div className="border-t pt-6 text-center text-sm text-gray-500">
      <p>Thank you for choosing our resort 🌿</p>
      <p className="mt-1">
        M.S. Enclave Heritage Resort • Palakkad
      </p>
    </div>

    {/* PRINT BUTTON */}
    <div className="mt-10 text-center print:hidden">
      <button
        onClick={() => window.print()}
        className="px-8 py-3 rounded-xl bg-[#7a0002] text-white hover:bg-[#5a0001] transition"
      >
        Print Invoice
      </button>
    </div>
  </div>
</div>
  );
}
