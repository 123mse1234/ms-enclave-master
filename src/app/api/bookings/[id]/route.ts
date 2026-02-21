import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/Booking";
import Room from "@/models/Room";
import Package from "@/models/Package";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    const pkg = await Package.findById(booking.packageId);
    const user = await User.findById(booking.userId);

    return NextResponse.json({
      ...booking.toObject(),
      package: pkg, // response key can still be "package"
      user,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking)
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    return NextResponse.json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
