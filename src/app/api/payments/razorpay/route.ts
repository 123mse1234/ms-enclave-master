export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY_ID!,
  key_secret: process.env.RAZORPAY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { amount, currency, bookingId } = await req.json();

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency,
      receipt: `receipt_${bookingId}`,
      payment_capture: 1,
    });

    return NextResponse.json(order);
  } catch (err: any) {
    console.error("Razorpay Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}