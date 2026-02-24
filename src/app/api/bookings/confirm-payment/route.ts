import { NextRequest, NextResponse } from "next/server";
import Booking from "@/models/Booking";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { bookingId, paymentMethod, razorpayPaymentId, razorpayOrderId, razorpaySignature, stripePaymentId, stripeSessionId } = await req.json();
    
    if (!bookingId || !paymentMethod) {
      return NextResponse.json({ error: "Missing booking ID or payment method" }, { status: 400 });
    }

    await connectDB();
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    

    // Update booking status
    booking.status = "paid";
    
    if (paymentMethod === "razorpay") {
      
      booking.paymentMethod = "razorpay"
      booking.razorpayPaymentId = razorpayPaymentId;
      booking.razorpayOrderId = razorpayOrderId;
      booking.razorpaySignature = razorpaySignature;
    } else if (paymentMethod === "stripe") {
      booking.paymentMethod = "stripe"
      booking.stripePaymentId = stripePaymentId;
      booking.stripeSessionId = stripeSessionId;
    }

    await booking.save();
    console.log('confirm api success');
    return NextResponse.json({ message: "Payment confirmed successfully", booking });

  } catch (err) {
    console.error(err);
    console.log('confirm api fail');
    return NextResponse.json({ error: "Failed to confirm payment" }, { status: 500 });
  }
}
