"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ConfettiOverlay from "@/components/common/ConfettiOverlay";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";

export default function BookingDetailsPage() {
  const { data: session } = useSession();
  const { id } = useParams();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/api/admin/bookings/${id}`)
      .then((res) => setBooking(res.data))
      .catch(() => {
        alert("Failed to load booking");
        router.push("/my-bookings");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  const fetChData = () => {
    axios
      .get(`/api/admin/bookings/${id}`)
      .then((res) => setBooking(res.data))
      .catch(() => {
        alert("Failed to load booking");
        router.push("/my-bookings");
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      setDeleting(true);
      await axios.delete(`/api/bookings/${id}`);
      alert("Booking deleted successfully");
      router.push("/admin/bookings");
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking");
    } finally {
      setDeleting(false);
    }
  };

  // Handle payment for a booking
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handler: async function (response: any) {
            // Confirm payment backend
            await axios.post("/api/bookings/confirm-payment", {
              bookingId: booking._id,
              paymentMethod: "razorpay",
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            setShowConfetti(true);
            toast.success("Payment successful!");
            setTimeout(() => {
              setShowConfetti(false);
            }, 4000);
            // router.refresh(); // refresh to update status
            fetChData();
          },
          theme: { color: "#3399cc" },
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        // router.push("/my-bookings");
      } else {
        // Stripe flow
        const res = await axios.post("/api/payments/stripe", {
          amount: booking.totalPrice,
          currency: "USD",
          bookingId: booking._id,
        });

        if (res.data.url) window.location.href = res.data.url;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Payment could not be initiated. Please try again.");
    } finally {
      setLoadingPayment(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-black">
      {/* 🎉 CONFETTI */}
      {showConfetti && <ConfettiOverlay show={showConfetti} />}
      {/* HEADER */}
      {loading ? (
        <Loader />
      ) : !booking ? (
        <p className="text-white text-center font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">
          Booking not found
        </p>
      ) : (
        <section className="py-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-5xl font-semibold text-amber-100 leading-tight text-shadow-sm mt-[-15px]">
                {booking.package?.packageName}
              </h1>
              <p className="text-sm text-gray-50 font-dm mt-1">
                Booking ID: {booking._id}
              </p>
            </div>

            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                booking.status === "paid"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "pending"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {booking.status.toUpperCase()}
            </span>
          </div>

          {/* IMAGE */}
          <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow mb-8">
            <Image
              src={booking.package?.image || "/default-room.jpg"}
              alt="Room"
              fill
              className="object-cover"
            />
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LEFT CONTENT */}
            <div className="md:col-span-2 space-y-6 font-dm">
              {/* Booking Info */}
              <div className="border border-white/10 bg-black/5 shadow-xl font-dm p-6 text-white">
                <h2 className="font-semibold text-xl mb-4 text-yellow-100">
                  Booking Information
                </h2>

                <div className="grid grid-cols-2 gap-4 text-md">
                  <p>
                    <strong>Check-in:</strong>
                    <br />
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Check-out:</strong>
                    <br />
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Nights:</strong>
                    <br />
                    {booking.nights}
                  </p>
                  <p>
                    <strong>Guests:</strong>
                    <br />
                    {booking.adults + booking.children}
                  </p>
                  <p>
                    <strong>Rooms:</strong>
                    <br />
                    {booking.roomsNeeded}
                  </p>
                  <p>
                    <strong>Payment:</strong>
                    <br />
                    {booking.paymentMethod || "Pending"}
                  </p>
                </div>
              </div>

              {/* Guest Info */}
              <div className="border border-white/10 bg-black/5 shadow-xl font-dm p-6 text-white">
                <h2 className="font-semibold text-xl mb-4 text-yellow-100">Guest Details</h2>

                <div className="text-md space-y-2 capitalize">
                  <p>
                    <strong>Name:</strong>{" "}
                    {booking.user?.name || booking.clientName}
                  </p>
                  <p>
                    <strong>Email:</strong> {booking.user?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {booking.phone || booking.user?.phone}
                  </p>
                  <p>
                    <strong>Nationality:</strong>{" "}
                    {booking.user?.nationality || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SUMMARY */}
            <div className="space-y-6">
              {/* Price Summary */}
              <div className="border border-white/10 bg-black/5 shadow-xl font-dm p-6 text-white">
                <h2 className="font-semibold text-xl text-yellow-100 mb-4">Price Summary</h2>

                <div className="space-y-2 text-md">
                  <div className="flex justify-between">
                    <span>Room Price</span>
                    <span>₹{booking.totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-100">
                    <span>Taxes & Fees</span>
                    <span>Included</span>
                  </div>

                  <hr className="my-2" />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{booking.totalPrice}</span>
                  </div>
                </div>

                {booking.status === "pending" && (
                  <button
                    onClick={() => handlePayment(booking)}
                    disabled={loadingPayment === booking._id}
                    className="w-full mt-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
                  >
                    {loadingPayment ? "Processing..." : "Pay Now"}
                  </button>
                )}
              </div>

              {/* Actions */}
              <div className="border border-white/10 bg-black/5 shadow-xl font-dm rounded-xl p-6">
                <button
                  onClick={() => router.push("/my-bookings")}
                  className="w-full py-2 rounded-lg text-white bg-black hover:bg-green-600"
                >
                  Back to My Bookings
                </button>
                {/* <button
          onClick={handleDelete}
          disabled={deleting}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete Booking"}
        </button> */}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
