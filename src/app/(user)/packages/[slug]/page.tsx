"use client";

import Breadcrumb from "@/components/common/Breadcrumb";
import PatternSection from "@/components/common/PatternSection";
import UserCalendarAvailability from "@/components/User/Booking/UserCalendarAvailability";
import GalleryHorizontalScrollSection from "@/components/User/Gallery/GalleryHorizontalScrollSection";
import PackageDetails from "@/components/User/Packages/package/PackageDetails";

export default function PackageSinglePage() {
  return (
    <>
    <Breadcrumb
            heading="Book Now"
            bgImage="/images/common/ms-enclave-17.webp" 
            items={[{ label: "Our Packages", href: "/packages" }]}
          />
    <PatternSection />
    <section>
        <div className="max-w-6xl mx-auto p-6  text-gray-900 py-20 grid  md:grid-cols-10 gap-10">
          {/* LEFT SIDE */}
          <div className="md:col-span-6">
            <PackageDetails />
          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-4">
            <div className="sticky top-24">
              <div className="rounded-xl  relative w-full overflow-hidden transition shadow-xl">
                <UserCalendarAvailability />
              </div>
            </div>
          </div>
        </div>
    </section>
    <PatternSection />
    <GalleryHorizontalScrollSection />

    </>
  );
}
