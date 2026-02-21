// src/app/api/bookings/room/[roomId]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET(req: Request, context: { params: any }) {
  try {
    await connectDB();

    // Unwrap params properly
    const { roomId } = await context.params;

    // Fetch all bookings for this room
    const bookings = await Booking.find({ roomId });

    // Collect all booked dates
    const bookedDates: string[] = [];
    bookings.forEach((booking) => {
      const start = new Date(booking.fromDate);
      const end = new Date(booking.toDate);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        bookedDates.push(new Date(d).toISOString().split("T")[0]); // YYYY-MM-DD
      }
    });

    return NextResponse.json(bookedDates);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch booked dates" }, { status: 500 });
  }
}
