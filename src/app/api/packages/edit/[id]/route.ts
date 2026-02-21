import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Package from "@/models/Package";
import cloudinary from "@/lib/cloudinary";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ FIXED
    await connectDB();

    const pkg = await Package.findById(id);

    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json(pkg);
  } catch (err) {
    console.error("GET Package Error:", err);
    return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectDB();

    const body = await req.json();
    const { removedImages, images, ...rest } = body;

    // 🔥 DELETE FROM CLOUDINARY
    if (removedImages && removedImages.length > 0) {
      for (const publicId of removedImages) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      {
        ...rest,
        images: images || [],
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Package updated & images deleted",
      data: updatedPackage,
    });
  } catch (err) {
    console.error("Cloudinary Delete Error:", err);
    return NextResponse.json(
      { error: "Failed to update package" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ FIXED
    
    await connectDB();
    await Package.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (err) {
    console.error("DELETE Package Error:", err);
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }
}
