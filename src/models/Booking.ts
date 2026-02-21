import mongoose, { Schema, models } from "mongoose";

const BookingSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
    adults: { type: Number },
    children: { type: Number },
    date: { type: Date },
    checkInDate: { type: Date },
    checkOutDate: { type: Date },
    roomsNeeded: { type: Number },
    nights: { type: Number, },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },

    // Razorpay fields
    clientName: { type: String },
    phone: { type: String },
    
    paymentMethod: { type: String },
    // Razorpay fields
    razorpayPaymentId: { type: String },
    razorpayOrderId: { type: String },
    razorpaySignature: { type: String },

    // Stripe fields
    stripePaymentId: { type: String },
    stripeSessionId: { type: String },
  },
  { timestamps: true }
);

const Booking = models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;
