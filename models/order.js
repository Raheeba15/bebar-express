// models/order.js
const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  paymentMethod: String,
  cardNumber: { type: String, default: null },
  expiry: { type: String, default: null },
  cvv: { type: String, default: null },
  items: { type: Array, default: [] },
  total: { type: Number, default: 0 },
  status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = model("order", orderSchema);
