const express = require("express");
const {
  signUp,
  signin,
  authentication,
  getMe,
  getUserBookings,
  getUserSingleBooking,
  validateSignUpFields,
  updateMe,
} = require("../controller/authController");

const router = express.Router();

router.post("/sign-up", validateSignUpFields, signUp);
router.post("/sign-in", signin);

router.use(authentication);
router.get("/get-me", getMe);
router.patch("/update-me", updateMe);
router.get("/get-user-bookings", getUserBookings);
router.get("/single-booking/:bookID", getUserSingleBooking);

module.exports = router;
