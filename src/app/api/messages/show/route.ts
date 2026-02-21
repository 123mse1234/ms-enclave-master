import Message from "@/models/Message";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  await connectDB();

  const { id } = await req.json();

  const updated = await Message.findByIdAndUpdate(
    id,
    { isShown: true },
    { new: true }
  );

  return NextResponse.json({ success: true, updated });
}
