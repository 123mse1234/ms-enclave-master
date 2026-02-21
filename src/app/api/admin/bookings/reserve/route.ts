import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/Booking";
import Room from "@/models/Room";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { fromDate, toDate, userName, roomName } = await req.json();
    if (!fromDate || !toDate || !userName || !roomName)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    await connectDB();

    // For demo, create a new Booking with dummy user/room references
    const room = await Room.findOne({ name: roomName }) || { _id: "dummy-room", name: roomName };
    const booking = await Booking.create({
      userId: userName,
      roomId: room._id,
      fromDate,
      toDate,
      guests: 1,
      totalPrice: 0,
      status: "pending",
      paymentMethod: "admin-reserve",
    });

    return NextResponse.json({
      _id: booking._id,
      fromDate: booking.fromDate,
      toDate: booking.toDate,
      user: { name: userName },
      room: { name: roomName },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to reserve booking" }, { status: 500 });
  }
}
