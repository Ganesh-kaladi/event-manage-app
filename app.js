const express = require("express");
const app = express();
const cors = require("cors");

const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require("./routes/authRoutes");
const paymentRoute = require("./routes/paymentRoute");
const globalError = require("./controller/errorController");

app.use(
  cors({
    origin: process.env.CORS_URL,
  })
);

app.set("query parser", "extended");

app.use(express.json());
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/payment", paymentRoute);

app.use(globalError);

module.exports = app;
