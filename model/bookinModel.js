const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
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
  tickets: {
    type: Number,
    required: true,
  },
  paymentSummay: {
    paymentID: { type: String, required: true },
    orderID: { type: String, required: true },
    subTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentDate: { type: String, required: true },
  },
  //   eventDetails: {
  //     from: { type: String, required: true },
  //     to: { type: String, required: true },
  //     dateOfAttend: { type: Date, required: true },
  //   },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
