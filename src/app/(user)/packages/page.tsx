"use client";

import Breadcrumb from "@/components/common/Breadcrumb";
import PatternSection from "@/components/common/PatternSection";
import PackagesSection from "@/components/User/Packages/PackagesSection";

export default function PackagesPage() {
  return (
    <section>
      <Breadcrumb
        heading="Discover Our Packages"
        bgImage="/images/common/ms-enclave-26.webp"
        items={[{ label: "Our Packages", href: "/packages" }]}
      />
      <PatternSection />
      <PackagesSection />
      

    </section>
  );
}
