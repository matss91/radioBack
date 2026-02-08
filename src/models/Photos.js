const { Schema, model } = require("mongoose");

const PhotoSchema = new Schema({
  fecha:String,
  linkPhoto: String,
  
  
});

module.exports = model("Photos", PhotoSchema);