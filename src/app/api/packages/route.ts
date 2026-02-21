import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Package from "@/models/Package";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const newPackage = await Package.create({
      packageName: body.packageName,
      description: body.description,
      slug: body.packageName.toLowerCase().replace(/\s+/g, "-"),
      image: body.image.url,
      imagePublicId: body.image.public_id,
      images: body.images || [], // ✅ NEW
      indianPrice: Number(body.indianPrice),
      foreignPrice: Number(body.foreignPrice),
      maxAdults: Number(body.maxAdults),
      maxChildren: Number(body.maxChildren),
      amenities: body.amenities,
      availability: body.availability,
      category: body.category || "General",
      isActive: true,
    });

    return NextResponse.json({ success: true, data: newPackage });
  } catch {
    return NextResponse.json(
      { error: "Failed to create package" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  const packages = await Package.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: packages });
}
