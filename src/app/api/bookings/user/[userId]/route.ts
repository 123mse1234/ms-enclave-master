import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Room from "@/models/Room";   // ✅ ADD THIS IMPORT
import User from "@/models/User";   // (Optional but recommended)
import Package from "@/models/Package";   // (Optional but recommended)

export async function GET(request: Request, context: { params: Promise<{ userId: string }> }) {
  const { userId } = await context.params;

  try {
    await connectDB();

    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 })
      .populate({
        path: "packageId",
        model: Package,   // ✅ use model reference, not string
        select: "packageName image",
      });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return NextResponse.json(
      { message: "Error fetching bookings" },
      { status: 500 }
    );
  }
}
