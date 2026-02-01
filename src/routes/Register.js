const router = require("express").Router();
const transporter=require("../option/server")
const crypto = require('crypto');
let usuarios = [];

router.post('/', async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).send('Faltan campos requeridos');
  }
  const token = crypto.randomBytes(20).toString('hex');
   usuarios.push({ nombre, email, password, verificado: false, token });
  // Enviar email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.REGISTRO_EMAIL, // correo que se encargará de registrar
    html: `<p>Hola ${nombre}, confirma tu cuenta haciendo clic <a href="http://localhost:4000/api/confirmar?token=${token}">aquí</a></p>`,
    text: `Nombre: ${nombre}\nEmail: ${email}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Registro enviado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al enviar el email');
  }
});

module.exports = {router,usuarios};