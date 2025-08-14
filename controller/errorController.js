module.exports = (err, req, res, next) => {
  res.status(400).json({
    status: "fail",
    error: {
      message: err.message,
      name: err.name,
    },
  });
};
