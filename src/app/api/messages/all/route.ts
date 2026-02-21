import Message from "@/models/Message";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const messages = await Message.find().sort({ createdAt: -1 });

  return NextResponse.json({ success: true, messages });
}
