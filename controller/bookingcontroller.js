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
  const { user, eventID, paymentSummay, tickets } = req.body;
  const orderID = `order#${Date.now()}`;
  const paymentID = `payment#ABC${Date.now()}`;
  const paymentDate = new Date().toISOString();
  const bookingData = {
    user,
    eventID,
    tickets,
    paymentSummay: {
      paymentDate: paymentDate,
      subTotal: paymentSummay.subTotal,
      total: paymentSummay.total,
      orderID: orderID,
      paymentID: paymentID,
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
