

const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String,
  verificado: { type: Boolean, default: false },
  token: String
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;