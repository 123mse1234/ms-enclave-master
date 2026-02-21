import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import RoomSettings from "@/models/RoomSettings";
import User from "@/models/User";
import Package from "@/models/Package";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    await connectDB();

    const { date } = await params;

    if (!date) {
      return NextResponse.json(
        { message: "Date is required" },
        { status: 400 }
      );
    }

    // SAFE DATE PARSING
    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay = new Date(`${date}T23:59:59.999Z`);

    if (isNaN(startOfDay.getTime())) {
      return NextResponse.json(
        { message: "Invalid date format" },
        { status: 400 }
      );
    }

    // Total rooms from settings
    const settings = await RoomSettings.findOne();
    const totalRooms = settings?.totalRooms || 0;

    // ✅ FETCH BOOKINGS + USER + PACKAGE
    const bookings = await Booking.find({
      checkInDate: { $lte: endOfDay },
      checkOutDate: { $gt: startOfDay },
      status: { $in: ["pending", "paid"] },
    })
      .populate({
        path: "userId",
        model: User,
        select: "name email phone image", // choose fields you want
      })
      .populate({
        path: "packageId",
        model: Package,
        select: "packageName indianPrice foreignPrice maxAdults maxChildren",
      })
      .sort({ createdAt: 1 });

    // Sum booked rooms
    const bookedRooms = bookings.reduce(
      (sum, b: any) => sum + (b.roomsNeeded || 1),
      0
    );

    return NextResponse.json({
      summary: {
        totalRooms,
        bookedRooms,
        availableRooms: totalRooms - bookedRooms,
      },
      bookings,
    });
  } catch (error) {
    console.error("Calendar availability error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
