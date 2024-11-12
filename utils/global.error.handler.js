module.exports = (err, req, res, next) => {
  const statusCode = res.statusCodes == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stackTrace: err.stack,
  });
};
