
const express = require("express");
const jwt = require("jsonwebtoken");
const transporter = require("../option/server");
const Usuario = require("../models/Users");
const router = express.Router();
router.post("/:id", async (req, res) => {
  try {
    const user = await Usuario.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const confirmUrl = `http://localhost:4000/api/confirm-delete/${token}`;

    await transporter.sendMail({
      from: '"Soporte" <matcardillo91@gmail.com>',
      to:"matcardillo91@gmail.com",
      subject: "Confirmar eliminación de cuenta",
      html: `
        <h2>Hola ${user.name}</h2>
        <p>Para eliminar tu cuenta, hacé click en el siguiente link:</p>
        <a href="${confirmUrl}">Eliminar mi cuenta</a>
        <p>Este link expira en 1 hora.</p>
      `,
    });

    res.json({ message: "Correo de confirmación enviado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
});

module.exports=router;