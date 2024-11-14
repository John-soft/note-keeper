const CustomError = require("./custom.error");

const notFound = (req, res, next) => {
  const err = new CustomError(`Route not found ${req.originalUrl}`, 400);
  next(err);
};

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCodes == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stackTrace: err.stack,
  });
};

module.exports = {
  globalErrorHandler,
  notFound,
};
