const express = require("express");
const {
  getAllEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  featuredEvent,
} = require("../controller/eventController");
const { authentication } = require("../controller/authController");

const router = express.Router();
router.get("/featured-events", featuredEvent);
router.get("/", getAllEvents);
router.get("/:id", getEvent);

router.use(authentication);
router.post("/", createEvent);
router.patch("/id", updateEvent);
router.delete("/id", deleteEvent);

module.exports = router;
