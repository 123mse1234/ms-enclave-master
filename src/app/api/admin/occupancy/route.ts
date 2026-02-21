import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import RoomSettings from "@/models/RoomSettings";

export async function GET() {
  await connectDB();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const settings = await RoomSettings.findOne();
  const totalRooms = settings?.totalRooms || 0;

  const bookings = await Booking.find({
    status: { $ne: "cancelled" },
    checkInDate: { $lt: tomorrow },
    checkOutDate: { $gt: today },
  });

  const bookedRooms = bookings.reduce(
    (sum, b) => sum + b.roomsNeeded,
    0
  );

  const availableRooms = totalRooms - bookedRooms;
  const occupancy = totalRooms
    ? Math.round((bookedRooms / totalRooms) * 100)
    : 0;

  return NextResponse.json({
    totalRooms,
    bookedRooms,
    availableRooms,
    occupancy,
  });
}
