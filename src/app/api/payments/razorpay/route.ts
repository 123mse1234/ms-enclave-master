import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY_ID!,
  key_secret: process.env.RAZORPAY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const { amount, currency, bookingId, user } = await req.json();
  const options = {
    amount: amount * 100, // in paise
    currency,
    receipt: `receipt_${bookingId}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (err) {
    return NextResponse.json({ error: "Razorpay order creation failed" }, { status: 500 });
  }
}
