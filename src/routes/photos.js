const router = require("express").Router();
const Photos = require("../models/Photos");
const auth=require("../middleware/auth.middleware")

// 🌍 Público - ver productos
router.get("/", async (req, res) => {
  const photos = await Photos.find();
  res.json(photos);
});

// 🔐 Admin - crear producto
router.post("/",auth, async (req, res) => {
  const photos = new Photos(req.body);
  await photos.save();
  res.json(photos);
});

// ✏️ Admin - editar
router.put("/:id",auth, async (req, res) => {
  const photos = await Photos.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(photos);
});

// ❌ Admin - eliminar
router.delete("/:id",auth, async (req, res) => {
  await photos.findByIdAndDelete(req.params.id);
  res.json({ msg: "Producto eliminado" });
});

module.exports = router;