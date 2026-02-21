import Breadcrumb from "@/components/common/Breadcrumb";
import PatternSection from "@/components/common/PatternSection";
import AboutSectionHistory from "@/components/User/About/AboutSectionHistory";
import HeritageArchitectureSection from "@/components/User/About/HeritageArchitectureSection";
import NearbyTouristPlaces from "@/components/User/About/NearbyTouristPlaces";
import VideoHeroSection from "@/components/User/Home/VideoHeroSection";


export default function AboutUsPage() {
  return (
    <>
      <Breadcrumb
        heading="M.S. Enclave Heritage Resort"
        bgImage="/images/common/ms-enclave-54.webp"   // ⭐ background image
        items={[
          { label: "About Us", href: "/about-us" }
        ]}
      />
        <PatternSection />
         <AboutSectionHistory />
        <PatternSection />
         <HeritageArchitectureSection />
        <PatternSection />
         <NearbyTouristPlaces />
        <PatternSection />
         <VideoHeroSection />
    </>
  );
}
