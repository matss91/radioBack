const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const Usuario = require("../models/Users");
const jwt=require("jsonwebtoken");
router.post("/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await Usuario.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no válido" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Contraseña actualizada correctamente" });

  } catch (error) {
    res.status(400).json({ message: "Token inválido o expirado" });
  }
});

module.exports=router;