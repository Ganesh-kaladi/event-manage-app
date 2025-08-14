const Booking = require("../model/bookinModel");

exports.getAllBookings = async (req, res, next) => {
  const booking = await Booking.find()
    .populate({ path: "user", select: "email firstName lastName" })
    .populate("eventID");
  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
};

exports.getBooking = async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
};

exports.createBooking = async (req, res, next) => {
  const { _id } = req.user;
  const { eventID, bookingSummary } = req.body;

  const bookingData = {
    eventID,
    user: _id,
    booking_status,
    person: bookingSummary.qauntity,
    bookingSummary: {
      orderID: bookingSummary.orderID,
      eventPrice: bookingSummary.eventPrice,
      quantity: bookingSummary.quantity,
      total: bookingSummary.total,
      paymentDate: new Date(),
      customer_name: bookingSummary.customer_name,
      customer_email: bookingSummary.customer_email,
    },
  };
  const booking = await Booking.create(bookingData);
  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
};

exports.updateBooking = async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
};

// exports.deletebooking = async (req, res, next) => {
//   const booking = await Booking.findByIdAndDelete(req.params.id);
//   res.status(204).json({
//     status: "success",
//     data: {
//       booking,
//     },
//   });
// };
