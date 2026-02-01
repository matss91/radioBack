const router = require("express").Router();
const {usuarios}=require("../routes/Register")
const Users=require("../models/Users")
const bcrypt = require('bcrypt');
router.get('/',async (req, res) => {
  const { token } = req.query;

  // Buscar usuario por token
  const usuario = usuarios.find(u => u.token === token);

  if (!usuario) return res.send('Token inválido');

  usuario.verificado = true;
  usuario.token = null; // Limpiar token
    const salt = await bcrypt.genSalt(10);

        // Hashear la contraseña usando el salt
        const hashedPassword = await bcrypt.hash(usuario.password, salt);
    const user = new Users({
  nombre: usuario.nombre,
  email: usuario.email,
  password: hashedPassword,
  verificado: usuario.verificado
});
await user.save();
  res.send('Cuenta confirmada! Ahora puedes iniciar sesión.');
  
});

module.exports=router;