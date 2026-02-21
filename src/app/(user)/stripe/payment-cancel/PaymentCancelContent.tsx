"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentCancelPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  useEffect(() => {
    if (bookingId) {
    }
  }, [bookingId]);

  return (
    <div className="max-w-2xl mx-auto mt-10 text-center">
      <h1 className="text-2xl font-bold text-red-600">Payment Cancelled</h1>
      <p className="mt-4">
        Your payment for booking <strong>{bookingId}</strong> was not completed.
      </p>
      <p className="mt-2">You can try again or contact support if needed.</p>
    </div>
  );
}
