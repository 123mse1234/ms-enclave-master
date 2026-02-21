"use client";
import "yet-another-react-lightbox/styles.css";
import Breadcrumb from "@/components/common/Breadcrumb";
import GalleryGrid from "@/components/User/Gallery/GalleryGrid";
import GalleryHorizontalScrollSection from "@/components/User/Gallery/GalleryHorizontalScrollSection";
import PatternSection from "@/components/common/PatternSection";


export default function GallerySection() {
  return (
    <section>
      <Breadcrumb
        heading="Explore Every Corner of M.S. Enclave"
        bgImage="/images/new/ms-enclave-out-side-with-pool.webp"
        items={[{ label: "Gallery", href: "/gallery" }]}
      />
      <PatternSection />
      <GalleryGrid />
      <PatternSection />
      <GalleryHorizontalScrollSection />
    </section>
  );
}
