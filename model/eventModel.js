const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    image: {
      url: { type: String, required: true },
      public__id: { type: String, required: true },
    },
    title: { type: String, required: true },
    category: { type: String, required: true },
    host: {
      name: { type: String, required: true },
      role: { type: String, required: true },
    },
    eventDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    ageLimit: { type: Number },
    location: { type: String, required: true },
    duration: { type: String },
    capacity: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    guests: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
      },
    ],
    tickets: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
