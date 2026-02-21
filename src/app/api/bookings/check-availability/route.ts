import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { roomId, fromDate, toDate } = body;

    if (!roomId || !fromDate || !toDate) {
      return NextResponse.json(
        { message: "roomId, fromDate and toDate are required" },
        { status: 400 }
      );
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);

    // Find if there is any booking overlapping with selected dates
    const overlappingBooking = await Booking.findOne({
      roomId,
      $or: [
        { fromDate: { $lte: to }, toDate: { $gte: from } }, // overlaps
      ],
    });

    if (overlappingBooking) {
      return NextResponse.json({
        available: false,
        message: "Room is already booked for these dates",
      });
    }

    return NextResponse.json({ available: true, message: "Room is available" });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
