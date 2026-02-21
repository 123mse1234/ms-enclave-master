import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Package from "@/models/Package";
import RoomSettings from "@/models/RoomSettings";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const packageId = searchParams.get("packageId");
    const checkIn = searchParams.get("checkIn");
    const nights = Number(searchParams.get("nights") || 1);

    if (!packageId || !checkIn) {
      return NextResponse.json(
        { message: "Missing params" },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + nights);

    const pkg = await Package.findById(packageId);
    if (!pkg) {
     return NextResponse.json({ message: "Package not found" }, { status: 404 });
    }

    const settings = await RoomSettings.findOne();
    const totalRooms = settings?.totalRooms ?? 0;


    // 🔥 Find overlapping bookings
    const bookings = await Booking.find({
      packageId,
      status: { $ne: "cancelled" },
      $or: [
        {
          checkInDate: { $lt: checkOutDate },
          checkOutDate: { $gt: checkInDate },
        },
      ],
    });
    const bookedRooms = bookings.reduce(
      (sum, b) => sum + b.roomsNeeded,
      0
    );

    const availableRooms = Math.max(totalRooms - bookedRooms, 0);
    return NextResponse.json({
      totalRooms: totalRooms ,
      bookedRooms,
      availableRooms,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
