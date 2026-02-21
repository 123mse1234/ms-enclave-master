import mongoose, { Schema, model, models } from "mongoose";

const RoomSettingsSchema = new Schema(
  {
    totalRooms: {
      type: Number,
      required: true,
      default: 8,
    },
    heroImage: {
      type: String,
      default: "",
    },
    gallery: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default models.RoomSettings ||
  model("RoomSettings", RoomSettingsSchema);
