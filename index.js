const express = require("express");
const config = require("./config/variables");
const app = express();
const morgan = require("morgan");
const http = require("http");
const bodyParser = require("body-parser");
const {
  globalErrorHandler,
  notFound,
} = require("./utils/global.error.handler");
const connectDB = require("./config/db");
const AppRoutes = require("./routes/app.routes");
const server = http.createServer(app);

const PORT = config.PORT;
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.json({ data: "Welcome to the note taking app " });
});
app.use("/api", AppRoutes);

app.all("*", notFound);
app.use(globalErrorHandler);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection occured! Shutting down");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught exception occured! Shutting down");
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received");
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received");
  process.exit(1);
});

process.on("SIGQUIT", () => {
  console.log("SIGQUIT signal received");
  process.exit(1);
});
