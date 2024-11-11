const express = require("express");
const config = require("./config/variables");
const app = express();
const morgan = require("morgan");
const http = require("http");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const AppRoutes = require("./routes/app.routes");
const server = http.createServer(app);

const PORT = config.PORT;
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Welcome to the note taking app ");
});
app.use("/api", AppRoutes);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
