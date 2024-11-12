const express = require("express");
const config = require("./config/variables");
const app = express();
const morgan = require("morgan");
const http = require("http");
const bodyParser = require("body-parser");
const CustomError = require("./utils/custom.error");
const globalErrorHandler = require("./utils/global.error.handler");
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

app.all("*", (req, res, next) => {
  const err = new CustomError(`Route ${req.originalUrl} not found`, 404);
  next(err);
});
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

//Handling uncaught exceptions
//Exceptions are synchronous errors in the program **** also shuts down the server
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught exception occured! Shutting down");
  server.close(() => {
    process.exit(1);
  });
});

//Signals for closing the server in case of any error

// Triggered by: Pressing Ctrl + C in the terminal.
// Default behavior: Terminates the process.
// Usage: You might handle SIGINT to perform cleanup tasks before the process shuts down.
process.on("SIGINT", () => {
  console.log("SIGINT signal received");
  process.exit(1);
});

// Triggered by: This is the standard signal used to politely ask a process to terminate. Often sent by kill <PID>, Docker, Kubernetes, or systemd when shutting down services.
// Default behavior: Terminates the process.
// Usage: Commonly used in production environments to gracefully shut down the process.
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received");
  process.exit(1);
});

// Triggered by: User pressing Ctrl + \ in the terminal. It’s similar to SIGINT but may also trigger a core dump (a file that records the memory of the process for debugging).
// Default behavior: Terminates the process and may generate a core dump.
// Usage: You may want to catch this signal to log additional debugging information before exiting.
process.on("SIGQUIT", () => {
  console.log("SIGQUIT signal received");
  process.exit(1);
});
