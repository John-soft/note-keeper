const express = require("express");
const app = express();
const AuthRoute = require("./auth.routes");
const UserRoutes = require("./user.routes");
const NoteRoutes = require("./note.routes");
const FolderRoutes = require("./note.routes");
app.use("/auth", AuthRoute);
app.use("/users", UserRoutes);
app.use("/notes", NoteRoutes);
app.use("/folders", FolderRoutes);

module.exports = app;
