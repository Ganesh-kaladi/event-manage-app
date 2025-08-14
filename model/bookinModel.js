const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    eventID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    person: {
      type: Number,
      required: true,
    },
    booking_status: {
      type: String,
      enum: ["pending", "confirmed"],
      default: "pending",
    },
    bookingSummary: {
      orderID: { type: String, required: true },
      eventPrice: { type: Number, required: true },
      quantity: { type: Number, required: true },
      total: { type: Number, required: true },
      paymentDate: { type: String, required: true },
      customer_name: { type: String, required: true },
      customer_email: { type: String, required: true },
      booking_type: { type: String, default: "online payment" },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
