"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export default function PaymentSuccessContent() {
  const params = useSearchParams();
  const router = useRouter();

  const bookingId = params.get("bookingId");
  const stripeSessionId = params.get("session_id");

  useEffect(() => {
    if (bookingId && stripeSessionId) {
      axios
        .post("/api/bookings/confirm-payment", {
          bookingId,
          paymentMethod: "stripe",
          stripeSessionId,
        })
        .then(() => {
          router.push("/bookings");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [bookingId, stripeSessionId, router]);

  return (
    <p className="text-center mt-10">
      Payment successful! Redirecting...
    </p>
  );
}
