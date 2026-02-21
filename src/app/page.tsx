import AmenitiesSlider from "@/components/User/Home/AmenitiesHighlights";
import HeroSlider from "@/components/User/Home/HeroSlider";
import HomeAboutSection from "@/components/User/Home/HomeAboutSection";
import HomeVideoSection from "@/components/User/Home/HomeVideoSection";
import RoomsPreviewSection from "@/components/User/Home/RoomsPreviewSection";
import HomeGallery from "@/components/User/Home/HomeGallery";
import PartyHall from "@/components/User/Home/PartyHall";
import PackageSwiper from "@/components/User/Packages/PackageSwiper";
import ActivitiesSwiper from "@/components/User/Home/ActivitiesSwiper";
import ContactFormSection from "@/components/User/Home/ContactFormSection";
import PatternSection from "@/components/common/PatternSection";

export default function Home() {
  return (
   <div className="overflow-x-hidden">
   <HeroSlider />
   <PatternSection />
   <HomeAboutSection />
   <PatternSection />
   <AmenitiesSlider />
   <PatternSection />
   <RoomsPreviewSection />
   <PatternSection />
   <PartyHall />
   <PatternSection />
   <PackageSwiper />
   <PatternSection />
   <HomeVideoSection />
   <PatternSection />
   <ActivitiesSwiper />
   <PatternSection />
   <HomeGallery />
   <PatternSection />
   <ContactFormSection />
   </div> 
  );
}
