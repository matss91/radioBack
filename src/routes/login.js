require('dotenv').config()
const router = require("express").Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const Usuario = require("../models/Users");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await Usuario.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Usuario no existe" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Password incorrecto" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

module.exports = router;