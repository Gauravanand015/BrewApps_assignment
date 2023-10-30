const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(
  "mongodb+srv://gauravanand:gauravanand@cluster0.41krvku.mongodb.net/brewapps?retryWrites=true&w=majority"
);

module.exports = connection;
