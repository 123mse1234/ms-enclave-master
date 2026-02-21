"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";

type Props = {
  onCountChange: (count: number) => void;
};

export default function MyBookings({ onCountChange }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState<string | null>(null);

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (status === "authenticated" && session?.user?.id) {
        try {
          const res = await axios.get(`/api/bookings/user/${session.user.id}`);
          setBookings(res.data);
          onCountChange(res.data.length);
        } catch (err) {
          console.error("Failed to load bookings:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookings();
  }, [status, session?.user?.id]); // ✅ only include the user id

  // Handle payment for a booking
  const handlePayment = async (booking: any) => {
    if (!session?.user) return;
    setLoadingPayment(booking._id);

    try {
      const nationality = session.user.nationality;
      if (nationality) {
        // Razorpay flow
        const res = await axios.post("/api/payments/razorpay", {
          amount: booking.totalPrice,
          currency: "INR",
          bookingId: booking._id,
          user: {
            name: session.user.name,
            email: session.user.email,
            contact: session.user.phone || "",
          },
        });

        const order = res.data;

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "MS Enclave Resort Palakkad",
          description: `Booking #${booking._id}`,
          order_id: order.id,
          prefill: {
            name: session.user.name,
            email: session.user.email,
            contact: session.user.phone || "",
          },
          handler: async function (response: any) {
            // Confirm payment backend
            await axios.post("/api/bookings/confirm-payment", {
              bookingId: booking._id,
              paymentMethod: "razorpay",
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            alert("Payment successful!");
            router.refresh(); // refresh to update status
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        router.push("/my-bookings");
      } else {
        // Stripe flow
        const res = await axios.post("/api/payments/stripe", {
          amount: booking.totalPrice,
          currency: "USD",
          bookingId: booking._id,
        });

        if (res.data.url) window.location.href = res.data.url;
      }
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment could not be initiated. Please try again.");
    } finally {
      setLoadingPayment(null);
    }
  };

  return (
  <div className="max-w-4xl mx-auto mt-10 text-white ">
    <h1 className="text-5xl font-semibold text-yellow-100 text-center leading-tight text-shadow-sm">Booking History</h1>

    {loading ? (
      <Loader />
    ) : bookings.length === 0 ? (
      <p className="text-white text-center font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">No bookings yet.</p>
    ) : (
      <div className="grid gap-6">
        <p className="text-white text-center font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">Access your past and upcoming stays at M.S. Enclave Heritage Resort. Manage reservations and revisit your memorable experiences.</p>
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="flex flex-col md:flex-row
      gap-4
      p-4 md:p-5
      rounded-2xl
      border border-white/10
      bg-black/5
      shadow-xl
      font-dm"
          >
            {/* IMAGE */}
<div className="relative w-full md:w-[260px] h-[180px] shrink-0">
  <Image
    src={booking.packageId?.image || "/default-room.jpg"}
    alt={booking.packageId?.packageName || "Room"}
    fill
    className="object-cover rounded-xl"
  />
</div>

            <div className="flex-1 flex flex-col justify-between">
              <h2 className="font-semibold text-lg">
                {booking.packageId?.packageName || "Room"}
              </h2>

              <p>
                {new Date(booking.checkInDate).toLocaleDateString()} →{" "}
                {new Date(booking.checkOutDate).toLocaleDateString()}
              </p>

              <p>Guests: {booking.adults + booking.children}</p>

              <p className="font-semibold">
                Total: ₹{booking.totalPrice}
              </p>

              <p className="mt-1">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    booking.status === "pending"
                      ? "text-orange-500"
                      : booking.status === "paid"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {booking.status.toUpperCase()}
                </span>
              </p>

              {/* ACTIONS */}
      <div className="flex flex-wrap gap-3 mt-4">
        {booking.status === "pending" && (
          <button
            onClick={() => handlePayment(booking)}
            disabled={loadingPayment === booking._id}
            className="
              px-4 py-2
              bg-blue-600 text-white
              rounded-lg
              text-sm font-semibold
              hover:bg-blue-700
              disabled:opacity-50
            "
          >
            {loadingPayment === booking._id ? "Processing..." : "Pay Now"}
          </button>
        )}

        <button
          onClick={() => router.push(`/my-bookings/${booking._id}`)}
          className="
            px-4 py-2
            bg-white text-black
            rounded-lg
            text-sm font-semibold
            hover:bg-gray-200
          "
        >
          View Details
        </button>
      </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}
