import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();
  const { email, name, phone, nationality, address } = await req.json();
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, phone, nationality, address },
      { new: true }
    );
    
    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Update failed" });
  }
}
