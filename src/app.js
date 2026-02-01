require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
express.json()
app.use(cors());
app.use(express.json());          // for JSON bodies
app.use(express.urlencoded({ extended: true })); // for form data
const {router} = require('./routes/Register');
app.use("/api/products", require("./routes/Programs"));
app.use("/api/register", router);
app.use("/api/confirmar", require("./routes/confirm"));

module.exports = app;
