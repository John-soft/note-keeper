const express = require("express");
const app = express();
const AuthRoute = require("./auth.route");
const UserRoutes = require("./user.routes");

app.use("/auth", AuthRoute);
app.use("/users", UserRoutes);

module.exports = app;
