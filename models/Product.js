const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true }, // path to image in /public/images
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = model("Product", productSchema);
