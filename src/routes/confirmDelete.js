
const express = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/Users");
const router = express.Router();
router.get("/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

    await Usuario.findByIdAndDelete(decoded.id);

    res.send("✅ Tu cuenta fue eliminada correctamente");
  } catch (error) {
    res.status(400).send("❌ Link inválido o expirado");
  }
});

module.exports=router;