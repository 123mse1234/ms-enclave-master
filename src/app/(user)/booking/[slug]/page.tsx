"use client";

import Breadcrumb from "@/components/common/Breadcrumb";
import BookingSection from "@/components/User/Booking/BookingSection";

export default function PackageBookingPage() {
  return (
    <section>
      <Breadcrumb
        heading="Book Your Room"
        bgImage="/images/common/ms-enclave-26.webp"
        items={[{ label: "Our Bookings", href: "/booking" }]}
      />
      <BookingSection />

    </section>
  );
}
