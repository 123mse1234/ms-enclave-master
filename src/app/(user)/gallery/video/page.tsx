

"use client";
import "yet-another-react-lightbox/styles.css";
import Breadcrumb from "@/components/common/Breadcrumb";
import PatternSection from "@/components/common/PatternSection";
import VideoGallery from "@/components/User/Gallery/VideoGallery";


export default function GallerySection() {
  return (
    <section>
      <Breadcrumb
        heading="Explore Our Resort Through Videos"
        bgImage="/images/new/ms-enclave-out-side-with-pool.webp"
        items={[{ label: "Gallery > Video", href: "/gallery/video" }]}
      />
      <PatternSection />
      <VideoGallery />
    </section>
  );
}
