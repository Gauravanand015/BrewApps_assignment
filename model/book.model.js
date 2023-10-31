const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  },
  {
    collection: "books",
    timestamps: true,
  }
);

const BookModel =
  mongoose.models.BookModel || mongoose.model("BookModel", bookSchema);

module.exports = BookModel;
