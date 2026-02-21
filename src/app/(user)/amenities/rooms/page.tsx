import Breadcrumb from "@/components/common/Breadcrumb";
import PatternSection from "@/components/common/PatternSection";
import RoomAmenities from "@/components/User/Amenities/Rooms/RoomAmenities";
import RoomsContact from "@/components/User/Amenities/Rooms/RoomsContact";
import RoomsGallerySection from "@/components/User/Amenities/Rooms/RoomsGallerySection";
import RoomsWelcomeSection from "@/components/User/Amenities/Rooms/RoomsWelcomeSection";
import RoomsWhyChooseUs from "@/components/User/Amenities/Rooms/RoomsWhyChooseUs";
import PackageSwiper from "@/components/User/Packages/PackageSwiper";

export default function RoomsPage() {
  return (
    <>
      <Breadcrumb
        heading="Discover Our Rooms"
        bgImage="/images/common/ms-enclave-24.webp"   // ⭐ background image
        items={[
          { label: "Our Rooms", href: "/amenities/rooms" }
        ]}
      />

      <div>
        <PatternSection />
        <RoomsWelcomeSection />
        <PatternSection />
        <PackageSwiper />
        <PatternSection />
        <RoomsWhyChooseUs />
        <PatternSection />
        <RoomsGallerySection />
        <PatternSection />
        <RoomAmenities />
        <PatternSection />
        <RoomsContact />
      </div>
    </>
  );
}
