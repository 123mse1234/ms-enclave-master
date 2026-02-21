import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import RoomSettings from "@/models/RoomSettings";

export async function POST(req: Request) {
    
  try {
   
    await connectDB();
    const { imageUrl } = await req.json();

    
    const updated = await RoomSettings.findOneAndUpdate(
      {},
      { $pull: { gallery: imageUrl } },    // remove from array
      { new: true }
    );

    return NextResponse.json({ status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
