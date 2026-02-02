require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
express.json();
app.use(cors());
app.use(express.json()); // for JSON bodies
app.use(express.urlencoded({ extended: true })); // for form data
const { router } = require("./routes/Register");
const { routerDelete } = require("./routes/resetPassword");
app.use("/api/products", require("./routes/Programs"));
app.use("/api/register", router);
app.use("/api/confirmar", require("./routes/confirm"));
app.use("/api/registerDelete",require("./routes/resetPassword"));
app.use("/api/reset-password", require("./routes/completeResetPassword"));
app.use("/api/request-delete", require("./routes/deleteUser"));
app.use("/api/confirm-delete", require("./routes/confirmDelete"));

module.exports = app;
