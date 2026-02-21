"use client";

import AdminCalender from "@/components/Admin/Calender/AdminCalender";



export default function CalendarAvailabilityPage() {

  return (
    <section className='bg-gray-50'>
          <div className='max-w-7xl p-8 mx-auto'>
          <div className=" grid md:grid-cols-2 gap-2 text-center select-none">
          <div>
            <AdminCalender />
          </div>
        </div>
        </div>
        </section>
  );
}
