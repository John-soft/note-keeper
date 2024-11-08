const handleResponse = async (req, res, payload, statusCode) => {
  try {
    res.setHeader("Cache-control", "no-cache");
    res.setHeader("Pragma", "no-store");
    res.setHeader("X-XSS-Protection", "1; mode=block");

    return res.status(statusCode).json({
      status: statusCode < 400 ? "Success" : "Error",
      data: payload,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: { message: "An unexpected error occurred, try again later!" },
      status: "Error",
    });
  }
};

module.exports = handleResponse;
