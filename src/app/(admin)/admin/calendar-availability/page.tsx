"use client";

import AdminBookingPreview from "@/components/Admin/Booking/AdminBookingPreview";
import AdminCalender from "@/components/Admin/Calender/AdminCalender";

export default function CalendarAvailabilityPage() {
  return (
    <section>
      <div className="max-w-7xl mx-auto p-6 text-white mt-5">
    <h1 className="text-5xl font-semibold text-yellow-100  leading-tight text-shadow-sm text-center ">Reservation Calendar</h1>
    
    <p className="text-center text-white font-medium text-lg text-shadow-lg leading-relaxed font-dm mt-3">Track bookings by date, view check-ins and check-outs, and manage room occupancy with ease. Use the calendar to filter and organize reservations, and quickly add new bookings directly as an admin for offline or manual entries.</p>
    </div>
      <div className="max-w-7xl p-8 mx-auto">
        <div className=" grid md:grid-cols-2 gap-2 text-center select-none">
          <div >
            <AdminCalender />
          </div>
          <div className="h-11/12 overflow-y-scroll">
            <AdminBookingPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
