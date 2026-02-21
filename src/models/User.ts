import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  image?: string;
  phone?: string;
  nationality?: string;
  address?: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  phone: String,
  nationality: String,
  address: String,
});

export default models.User || mongoose.model<IUser>("User", UserSchema);
