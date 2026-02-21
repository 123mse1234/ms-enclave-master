import AdminBookingPreview from "@/components/Admin/Booking/AdminBookingPreview";
import UserCalendarAvailability from "@/components/User/Booking/UserCalendarAvailability";

export default function AdminHome() {
  return (
    <>
    <section>
      <div className="max-w-7xl mx-auto py-10 grid  md:grid-cols-10 gap-10">
        <div className="md:col-span-6">
          <AdminBookingPreview />
        </div>
        
        <div className="md:col-span-4 ">
          <UserCalendarAvailability />
        </div>
      
      </div>
    </section>
    </>
  );
}
