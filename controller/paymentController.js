const catchAsync = require("../utiles/catchAsync");
const { Cashfree, CFEnvironment } = require("cashfree-pg");
const Event = require("../model/eventModel");
const Booking = require("../model/bookinModel");

let cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID,
  process.env.CASHFREE_SECRET_KEY
);

exports.craetePayment = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.user;
    const { quantity } = req.body;
    const event = await Event.findById({ _id: req.params.eventID }).select(
      "price"
    );
    const amount = quantity * event.price;
    const orderId = await `ETA_u1234_e1234_${Date.now()}`;

    const request = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: "CUST123",
        customer_name: `${firstName} ${lastName}`,
        customer_email: email,
        customer_phone: "9999999999",
      },
    };

    const response = await cashfree.PGCreateOrder(request);
    res.json({
      status: "success",
      data: {
        order: response.data,
        quantity: quantity,
        eventAmount: event.price,
        event_id: event._id,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.response.data || err.message });
  }
};

exports.verifyPayment = catchAsync(async (req, res, next) => {
  try {
    const { _id } = req.user;

    const {
      order_id,
      event_id,
      eventAmount,
      total,
      customer_name,
      customer_email,
      quantity,
    } = req.body;

    const verification = await cashfree.PGFetchOrder(order_id);
    const bookingData = {
      eventID: event_id,
      user: _id,
      person: quantity,
      bookingSummary: {
        orderID: order_id,
        eventPrice: eventAmount,
        quantity: quantity,
        total: total,
        paymentDate: new Date(),
        customer_name: customer_name,
        customer_email: customer_email,
      },
    };
    if (
      verification.data.order_status === "PAID" ||
      verification.data.order_status === "ACTIVE"
    ) {
      bookingData.booking_status = "confirmed";
    }
    const booking = await Booking.create(bookingData);
    res.json({ data: { recipt: verification.data, booking } });
  } catch (err) {
    // console.log(err.message);
    res.status(400).json({ status: "success", err: err.message });
  }
});
