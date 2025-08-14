const Booking = require("../model/bookinModel");
const User = require("../model/userModel");
const AppError = require("../utiles/appError");
const catchAsync = require("../utiles/catchAsync");
const jwt = require("jsonwebtoken");

const sendJWT = function (id) {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: 60 * 60 * 24 * 10,
    // expiresIn: 5,
  });
};

exports.validateSignUpFields = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(new AppError(`email already registered.`, 404));
  }
  next();
});

exports.authentication = catchAsync(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new AppError("user is not logged in account", 400));
  }
  const token = req.headers.authorization.split(" ");
  const decode = await jwt.verify(token[1], process.env.JWT_KEY);
  const user = await User.findById({ _id: decode.id });
  req.user = user;
  req.userRole = user.role;

  next();
});

exports.signUp = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    password,
    email,
  });
  const token = await sendJWT(user._id);
  res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new AppError("please provide email and password."));
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.checkHashedPassword(password, user.password))) {
    return next(new AppError("user and password are incorrect."));
  }
  const token = await sendJWT(user._id);
  res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id }).select(
    "-password -role"
  );
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // if (req.file) {
  //   const uploadResult = await uploadImage(req.file.buffer);
  //   req.body.profileImage = {
  //     url: uploadResult.secure_url,
  //     id: uploadResult.public_id,
  //   };
  // }
  const user = await User.findByIdAndUpdate({ _id: req.user._id }, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getUserBookings = catchAsync(async (req, res, next) => {
  const booking = await Booking.find({ user: req.user._id })
    .populate({
      path: "eventID",
      select: "title price eventDate location",
    })
    .select("person booking_status")
    .sort("-createdAt");

  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});

exports.getUserSingleBooking = catchAsync(async (req, res, next) => {
  const { bookID } = req.params;
  const booking = await Booking.findOne({ _id: bookID, user: req.user._id })
    .populate({
      path: "user",
      select: "firstName lastName email",
    })
    .populate({
      path: "eventID",
      select: "-updatedAt",
    });

  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});
