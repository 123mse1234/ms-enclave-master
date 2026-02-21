import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import RoomSettings from "@/models/RoomSettings";

/**
 * Normalize a date to local midnight
 * (CRITICAL for MongoDB + Vercel timezone issues)
 */
function normalize(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  // Frontend sends JS month (0–11)
  const month = Number(searchParams.get("month"));
  const year = Number(searchParams.get("year"));

  const settings = await RoomSettings.findOne();
  const totalRooms = settings?.totalRooms || 0;

  // Month range
  const start = new Date(year, month, 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(year, month + 1, 1);
  end.setHours(0, 0, 0, 0);

  // Fetch overlapping bookings
  const bookings = await Booking.find({
    status: { $ne: "cancelled" },
    checkInDate: { $lt: end },
    checkOutDate: { $gt: start },
  });

  const days: Record<string, { booked: number; available: number }> = {};

  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    const day = new Date(d);
    day.setHours(0, 0, 0, 0);

    const booked = bookings
      .filter(b => {
        const checkIn = normalize(b.checkInDate);
        const checkOut = normalize(b.checkOutDate);

        // Hotel rule: [checkIn, checkOut)
        return checkIn <= day && day < checkOut;
      })
      .reduce((sum, b) => sum + b.roomsNeeded, 0);

    const key = `${day.getFullYear()}-${String(
      day.getMonth() + 1
    ).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;

    days[key] = {
      booked,
      available: totalRooms - booked,
    };
  }
  return NextResponse.json(days);
}