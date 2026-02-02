
const express = require("express");
const jwt = require("jsonwebtoken");
const transporter = require("../option/server");
const Usuario = require("../models/Users");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Usuario.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink = `http://localhost:4000/api/reset-password/${token}`;

    await transporter.sendMail({
      from: "Soporte <matcardillo91@gmail.com>",
      to: "matcardillo91@gmail.com",
      subject: "Recuperar contraseña",
      html: `
        <p>Hola ${user.name}</p>
        <p>Haz clic para recuperar tu contraseña:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Este link expira en 15 minutos</p>
      `
    });

    res.json({ message: "Correo enviado" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al enviar correo" });
  }
});

module.exports = router;