const { Schema, model } = require("mongoose");

const PhotoSchema = new Schema({
  fecha:Number,
  linkPhoto: String,
  
  
});

module.exports = model("Photos", PhotoSchema);