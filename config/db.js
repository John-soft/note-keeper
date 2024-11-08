const mongoose = require("mongoose");
const { bold, green, red, italic } = require("kleur");
const config = require("../config/variables");
const MONGO_URI = config.LOCAL_MONGO_URL;

module.exports = connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI || "");
    console.log(
      bold(green(italic(`[Database]: Database Connected Successfully`)))
    );
  } catch (error) {
    console.log(`Failed to connect to the database: ${error.message}`);
    setTimeout(connectDB, 5000);
  }
};
