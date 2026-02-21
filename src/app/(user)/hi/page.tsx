import NearbyTouristPlacesVideo from '@/components/User/About/NearbyTouristPlacesVideo'
import AboutUsSection from "@/components/User/Home/AboutUsSection";
import BookNowSection from '@/components/User/Home/BookNowSection';
import SecondGallery from '@/components/User/Home/SecondGallery';


const page = () => {
  return (
    <>
    <NearbyTouristPlacesVideo />
    <AboutUsSection />
   <BookNowSection />
   <SecondGallery />
    </>
  )
}

export default page