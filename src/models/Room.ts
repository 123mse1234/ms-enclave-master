import mongoose, { Schema, models } from "mongoose";

const RoomSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    maxGuests: { type: Number, required: true },
    images: [{ type: String }], // image URLs
    amenities: [{ type: String }], // e.g. ['AC', 'TV', 'Free WiFi']
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Room = models.Room || mongoose.model("Room", RoomSchema);
export default Room;
