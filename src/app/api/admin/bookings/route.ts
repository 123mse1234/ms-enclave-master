import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/Booking";
import Room from "@/models/Room";
import User from "@/models/User";
import Package from "@/models/Package";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const bookings = await Booking.find({}).sort({ createdAt: -1 });

    const detailedBookings = await Promise.all(
      bookings.map(async (b) => {
        const pkg = await Package.findById(b.packageId);
        const user = await User.findById(b.userId);

        return {
          ...b.toObject(),
          packageId: pkg,
          userId: user,
        };
      })
    );
    return NextResponse.json(detailedBookings);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
