"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";
import toast from "react-hot-toast";
import ConfettiOverlay from "@/components/common/ConfettiOverlay";
import Loader from "@/components/common/Loader";
import PackageSwiperForNotBooking from "@/components/User/Booking/PackageSwiperForNotBooking";

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const [loadingPayment, setLoadingPayment] = useState<string | null>(null);

  const [view, setView] = useState<"card" | "list">("card");

  /* Load view preference */
  useEffect(() => {
    const savedView = localStorage.getItem("bookingView");
    if (savedView === "list" || savedView === "card") {
      setView(savedView);
    }
  }, []);

  /* Save view preference */
  useEffect(() => {
    localStorage.setItem("bookingView", view);
  }, [view]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      axios
        .get(`/api/bookings/user/${session.user.id}`)
        .then((res) => setBookings(res.data))
        .finally(() => setLoading(false));
    }
  }, [status, session?.user?.id]);

  // RazorPayLoader 
  const loadRazorpayScript = () => {
  return new Promise<boolean>((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

  // Handle payment for a booking
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePayment = async (booking: any) => {
    if (!session?.user) return;
    setLoadingPayment(booking._id);

    try {
      const nationality = session.user.nationality;
      if (nationality) {
        const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }
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
            setShowConfetti(true)
            toast.success("Payment successful!");
            setTimeout(() => {
              setShowConfetti(false)
            }, 4000);
            router.refresh(); // refresh to update status
          },
          theme: { color: "#3399cc" },
        };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.log(err);
      
      toast.error("Payment could not be initiated. Please try again.");
    } finally {
      setLoadingPayment(null);
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading…</p>;

  if (bookings.length === 0)
    return <p className="text-center mt-20 text-gray-500">No bookings found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-black">
      {/* 🎉 CONFETTI */}
               {showConfetti && (
              <ConfettiOverlay show={showConfetti} />
            )}
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-semibold text-yellow-100  leading-tight text-shadow-sm">My Bookings</h1>

        {/* View Toggle */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setView("card")}
            className={`p-2 rounded-md ${
              view === "card"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-md ${
              view === "list"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {loading ? (
  <Loader />
) : bookings.length === 0 ? (
  <>
  <p className="text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">
    You haven’t made any bookings yet. Explore our exciting resort packages and plan your perfect getaway today.
  </p>
     <PackageSwiperForNotBooking />
  </>
  
) : (
  <>
    {/* CONTENT */}
    {view === "card" ? (
      /* ---------------- CARD VIEW ---------------- */
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="relative h-44 w-full">
              <Image
                src={booking.packageId?.image || "/default-room.jpg"}
                alt="Room"
                fill
                className="object-cover"
              />
              <span
                className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
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

            <div className="p-5 space-y-2 border border-white/10 font-semibold text-lg  text-white  bg-black/5   shadow-xl   font-dm">
              <h2 className="font-semibold text-lg">
                {booking.packageId?.packageName}
              </h2>

              <p className="text-sm">
                {new Date(booking.checkInDate).toLocaleDateString()} →{" "}
                {new Date(booking.checkOutDate).toLocaleDateString()}
              </p>

              <p className="text-sm">
                Guests: {booking.adults + booking.children}
              </p>

              <div className="flex justify-between items-center pt-2">
                <p className="text-lg font-bold">₹{booking.totalPrice} /-</p>

                <div className="flex gap-2">
                  {booking.status === "pending" && (
                    <button
                      onClick={() => handlePayment(booking)}
                      disabled={loadingPayment === booking._id}
                      className="   px-4 py-2   bg-blue-600 text-white   rounded-lg   text-sm font-semibold   hover:bg-blue-700   disabled:opacity-50   "
                    >
                      Pay Now
                    </button>
                  )}

                  <button
                    onClick={() =>
                      router.push(`/my-bookings/${booking._id}`)
                    }
                    className="   px-4 py-2   bg-white text-black   rounded-lg   text-sm font-semibold   hover:bg-gray-200   "
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      /* ---------------- FIXED LIST UI ---------------- */
<div className="space-y-4">
  {bookings.map((booking) => (
    <div
      key={booking._id}
      className="
        grid
        grid-cols-1
        md:grid-cols-[2fr_1fr_1fr_1fr]
        gap-4
        items-center
        p-4 md:p-5
        rounded-2xl
        border border-white/10
        bg-black/5
        shadow-xl
        font-dm
      "
    >
      {/* PACKAGE INFO */}
      <div className="flex gap-4 items-center min-w-0">
        <div className="relative w-24 h-20 shrink-0">
          <Image
            src={booking.packageId?.image || "/default-room.jpg"}
            alt="Room"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">
            {booking.packageId?.packageName}
          </h3>

          <p className="text-sm text-white/70">
            {new Date(booking.checkInDate).toLocaleDateString()} →{" "}
            {new Date(booking.checkOutDate).toLocaleDateString()}
          </p>

          <p className="text-sm text-white/70">
            Guests: {booking.adults + booking.children}
          </p>
        </div>
      </div>

      {/* TOTAL */}
      <div className="text-left md:text-center">
        <p className="text-sm text-white/70">Total</p>
        <p className="text-lg font-bold text-yellow-100">
          ₹{booking.totalPrice}
        </p>
      </div>

      {/* STATUS */}
      <div className="md:text-center">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
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

      {/* ACTIONS */}
      <div className="flex gap-2 md:justify-end">
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
            {loadingPayment === booking._id
              ? "Processing..."
              : "Pay Now"}
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
          View
        </button>
      </div>
    </div>
  ))}
</div>
    )}
  </>
)}

    </div>
  );
}
