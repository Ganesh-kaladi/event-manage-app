const express = require("express");
const {
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
} = require("../controller/bookingcontroller");

const router = express.Router();

router.route("/").get(getAllBookings).post(createBooking);
router.route("/:id").get(getBooking).patch(updateBooking);

module.exports = router;
