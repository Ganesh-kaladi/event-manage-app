const express = require("express");
const {
  craetePayment,
  verifyPayment,
} = require("../controller/paymentController");
const { authentication } = require("../controller/authController");
const router = express.Router();

router.use(authentication);
router.post("/create-order-payment/:eventID", craetePayment);
router.post("/verify-payment/", verifyPayment);

module.exports = router;
