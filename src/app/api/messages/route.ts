import Message from "@/models/Message";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const newMessage = await Message.create(body);

    return NextResponse.json(
      { success: true, message: "Message stored successfully!", data: newMessage },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to Store message", error },
      { status: 500 }
    );
  }
}
