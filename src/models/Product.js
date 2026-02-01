const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  numberProgram: Number,
  linkSpotify: String,
  
});

module.exports = model("Product", ProductSchema);