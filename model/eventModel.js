const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  eventDate: { type: Date, required: true },
  host: { type: String, required: true },
  guests: { type: Array },
  tickets: { type: Number, required: true },
  category: { type: String, required: true },
  place: { type: String, equired: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  price: { type: Number, required: true },
  ageLimit: { type: Number },
  image: { type: String, required: true },
});

// id: 1001,
// title: "Summer Music Festival",
// eventDate: "2025-07-15",
// guests: ["John Doe", "Jane Smith", "DJ Echo"],
// place: "Central Park, New York City",
// capacity: 5000,
// category: "Music",
// tickets: 3200,
// duration: "6 hours",
// eventHost: "XYZ Entertainment",
// ticketPrice: 75.0,
// ageLimit: 18,

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
