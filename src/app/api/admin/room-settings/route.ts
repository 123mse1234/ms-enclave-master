import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import RoomSettings from "@/models/RoomSettings";

export async function GET() {
  await connectDB();
  const settings = await RoomSettings.findOne();

  return NextResponse.json(settings || {});
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const updated = await RoomSettings.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });
    return NextResponse.json({data:updated, success: true });
   
  } catch (err) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
