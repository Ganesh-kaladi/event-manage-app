const Event = require("../model/eventModel");
const catchAsync = require("../utiles/catchAsync");

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const query_fields = { ...req.query };

  const excluded_fileds = ["sort", "limit", "page", "search"];
  excluded_fileds.forEach((el) => delete query_fields[el]);
  let query_element = JSON.stringify(query_fields);
  query_element = JSON.parse(
    query_element.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
  );

  let query = Event.find(query_element);

  if (req.query.sort) {
    const sort_field = req.query.sort.split(",").join(" ");
    query = query.sort(sort_field);
  }

  if (req.query.search) {
    const search_field = req.query.search;
    query = query.find({
      $or: [
        { title: { $regex: search_field, $options: "i" } },
        { "guests.name": { $regex: search_field, $options: "i" } },
      ],
    });
  }

  if (req.query.category) {
    const category_field = req.query.category;
    query = query.find({ category: category_field });
  }

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 12;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);
  const event = await query;
  res.status(200).json({
    status: "success",
    length: event.length,
    data: {
      event,
    },
  });
});

exports.featuredEvent = catchAsync(async (req, res, next) => {
  const event = await Event.find().sort("price eventDate").skip(0).limit(6);
  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});

exports.getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});

exports.createEvent = catchAsync(async (req, res, next) => {
  const event = await Event.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});

exports.updateEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      event,
    },
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: {
      event,
    },
  });
});
