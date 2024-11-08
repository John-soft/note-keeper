require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 4000,
  LOCAL_MONGO_URL: process.env.LOCAL_MONGO_URL,
  JWT_SCRECT_KEY: process.env.JWT_SCRECT_KEY,
  LOGIN_EXPIRES: process.env.LOGIN_EXPIRES,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_HOST: process.env.EMAIL_HOST,
};
