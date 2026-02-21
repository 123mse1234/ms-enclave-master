import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import RoomSettings from "@/models/RoomSettings";
import Package from "@/models/Package";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      date,
      rooms,
      clientName,
      phone,
      packageId,
      totalPrice,
    } = body;

    if (!date || !rooms || !clientName || !phone || !packageId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ================= DATE RANGE ================= */

    const checkInDate = new Date(`${date}T12:00:00.000Z`);
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + 1);

    /* ================= TOTAL ROOMS ================= */

    const settings = await RoomSettings.findOne();
    const totalRooms = settings?.totalRooms || 0;

    /* ================= EXISTING BOOKINGS ================= */

    const existingBookings = await Booking.find({
      checkInDate: { $lt: checkOutDate },
      checkOutDate: { $gt: checkInDate },
      status: { $in: ["pending", "paid"] },
    });

    const bookedRooms = existingBookings.reduce(
      (sum, b) => sum + (b.roomsNeeded || 0),
      0
    );

    if (bookedRooms + rooms > totalRooms) {
      return NextResponse.json(
        { message: "Not enough rooms available" },
        { status: 400 }
      );
    }

    /* ================= PACKAGE ================= */

    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return NextResponse.json(
        { message: "Invalid package" },
        { status: 400 }
      );
    }

    /* ================= CREATE BOOKING ================= */

    const booking = await Booking.create({
      userId: null, // admin booking
      packageId,
      roomsNeeded: rooms,
      adults: 0,
      children: 0,

      checkInDate,
      checkOutDate,
      nights: 1,

      totalPrice,
      status: "paid",

      // admin manual fields
      clientName,
      phone,
      paymentMethod: "admin-manual",
    });

    return NextResponse.json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Manual booking error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
