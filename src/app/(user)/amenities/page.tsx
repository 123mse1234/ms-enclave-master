import Breadcrumb from "@/components/common/Breadcrumb";
import PatternSection from "@/components/common/PatternSection";
import ArtificialRainPreviewSection from "@/components/User/Amenities/ArtificialRainPreviewSection";
import PartyHallPreviewSection from "@/components/User/Amenities/PartyHallPreviewSection";
import PoolPreviewSection from "@/components/User/Amenities/PoolPreviewSection";
import RoomPreviewSection from "@/components/User/Amenities/RoomPreviewSection";

export default function AmenitiesPage() {
  return (
    <>
      <Breadcrumb
        heading="Discover Our Amenities"
        bgImage="/images/common/ms-enclave-17.webp" 
        items={[{ label: "Our Amenities", href: "/amenities" }]}
      />

      <div>
        <RoomPreviewSection />
        <PatternSection />
        <PartyHallPreviewSection />
        <PatternSection />
        <PoolPreviewSection />
        <PatternSection />
        <ArtificialRainPreviewSection /> 
      </div>
    </>
  );
}
