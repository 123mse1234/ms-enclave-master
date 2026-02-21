"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function BookingDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);


  useEffect(() => {
    if (!id) return;

    axios
      .get(`/api/admin/bookings/${id}`)
      .then((res) => setBooking(res.data))
      .catch(() => {
        alert("Failed to fetch booking");
        router.push("/admin/bookings");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      setDeleting(true);
      await axios.delete(`/api/admin/bookings/${id}`);
      alert("Booking deleted successfully");
      router.push("/admin/bookings");
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading booking details...</p>;
  }

  if (!booking) {
    return <p className="text-center mt-10">Booking not found</p>;
  }

  const isUserBooking = Boolean(booking.userId);

  const customerName = isUserBooking
    ? booking.userId.name
    : booking.clientName;

  const customerEmail = isUserBooking
    ? booking.userId.email
    : "Admin Manual Booking";

  const customerPhone =
    booking.phone || booking.userId?.phone || "N/A";

  const statusColor =
    booking.status === "paid"
      ? "bg-green-100 text-green-700"
      : booking.status === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
   <section className="py-10">
  <div className="max-w-6xl mx-auto px-4 py-10 text-white font-dm">

    {/* HEADER */}
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-5xl font-semibold text-amber-100 leading-tight mt-[-15px]">
          {booking.package?.packageName}
        </h1>
        <p className="text-sm text-gray-300 mt-1">
          Booking ID: {booking._id}
        </p>
      </div>

      <span
        className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColor}`}
      >
        {booking.status.toUpperCase()}
      </span>
    </div>

    {/* IMAGE */}
    <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow mb-8">
      <Image
        src={booking.package.image}
        alt={booking.package.packageName}
        fill
        className="object-cover"
      />
    </div>

    {/* GRID */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* LEFT SIDE */}
      <div className="md:col-span-2 space-y-6">

        {/* Booking Info */}
        <div className="border border-white/10 bg-black/5 shadow-xl p-6">
          <h2 className="font-semibold text-xl mb-4 text-yellow-100">
            Booking Information
          </h2>

          <div className="grid grid-cols-2 gap-4 text-md">
            <p><strong>Check-in:</strong><br />
              {new Date(booking.checkInDate).toLocaleDateString()}
            </p>
            <p><strong>Check-out:</strong><br />
              {new Date(booking.checkOutDate).toLocaleDateString()}
            </p>
            <p><strong>Nights:</strong><br />{booking.nights}</p>
            <p><strong>Rooms:</strong><br />{booking.roomsNeeded}</p>
            <p><strong>Adults:</strong><br />{booking.adults}</p>
            <p><strong>Children:</strong><br />{booking.children}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="border border-white/10 bg-black/5 shadow-xl p-6">
          <h2 className="font-semibold text-xl mb-4 text-yellow-100">
            Customer Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-md">
            <p><strong>Name:</strong> {booking.user?.name}</p>
            <p><strong>Email:</strong> {booking.user?.email}</p>
            <p><strong>Phone:</strong> {booking.user?.phone}</p>
            {isUserBooking && (
              <>
                <p><strong>Nationality:</strong> {booking.user?.nationality}</p>
                <p><strong>Address:</strong> {booking.user?.address}</p>
              </>
            )}
          </div>

          <div className="mt-3 text-xs text-gray-400">
            Booking Type: {isUserBooking ? "User Booking" : "Admin Manual Booking"}
          </div>
        </div>

        {/* Payment Info */}
        <div className="border border-white/10 bg-black/5 shadow-xl p-6">
          <h2 className="font-semibold text-xl mb-4 text-yellow-100">
            Payment Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-md">
            <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
            <p><strong>Payment Method:</strong> {booking.paymentMethod || "Online"}</p>
            <p><strong>razorpayOrderId:</strong> {booking.razorpayOrderId || "—"}</p>
            <p><strong>razorpayPaymentId:</strong> {booking.razorpayPaymentId || "—"}</p>
            <p><strong>Booking Date:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-6">

        {/* Price Summary */}
        <div className="border border-white/10 bg-black/5 shadow-xl p-6">
          <h2 className="font-semibold text-xl text-yellow-100 mb-4">
            Price Summary
          </h2>

          <div className="space-y-2 text-md">
            <div className="flex justify-between">
              <span>Room Price</span>
              <span>₹{booking.totalPrice}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Taxes & Fees</span>
              <span>Included</span>
            </div>

            <hr className="my-2 border-white/10" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{booking.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* ADMIN ACTIONS */}
        <div className="border border-white/10 bg-black/5 shadow-xl rounded-xl p-6 space-y-3">

          {/* <button
            onClick={() => window.print()}
            className="w-full py-2 rounded-lg bg-white text-black hover:bg-gray-200"
          >
            Print Invoice
          </button> */}

          <button
            onClick={() => router.push(`/admin/bookings/${id}/invoice`)}
            className="w-full py-2 rounded-lg bg-[#7a0002] text-white hover:bg-red-900"
          >
            View Invoice
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="w-full py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete Booking"}
          </button>

        </div>
      </div>

    </div>
  </div>
</section>
  );
}
