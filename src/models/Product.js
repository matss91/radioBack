const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  numberProgram: Number,
  linkSpotify: String,
  description:String,
  
});

module.exports = model("Product", ProductSchema);