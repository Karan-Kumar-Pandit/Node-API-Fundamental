const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
  name: String,
  email: String,
});

module.exports = mongoose.model("users", loginSchema);
