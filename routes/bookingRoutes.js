const express = require("express");
const {
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
} = require("../controller/bookingcontroller");
const { authentication } = require("../controller/authController");

const router = express.Router();

router.use(authentication);
router.route("/").get(getAllBookings).post(createBooking);
router.get("/:id", getBooking);

router.patch("/:id", updateBooking);

module.exports = router;
