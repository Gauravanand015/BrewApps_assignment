const express = require("express");
const authentication = require("../middleware/authentication.middleware");
const BookModel = require("../model/book.model");
const createHttpError = require("http-errors");
const bookRoutes = express.Router();

// this route will give all the books which are posted
bookRoutes.get("/", async (req, res) => {
  const books = await BookModel.find().select("author title summary");
  res.send(books);
});

// Logged In user can post the books
bookRoutes.post("/", authentication, async (req, res) => {
  try {
    const { author, summary, title } = req.body;
    const books = await BookModel({
      author,
      summary,
      title,
      userId: req.body.userId,
    }).save();

    res.send(books);
  } catch (error) {
    next(error);
  }
});

// get the books by the id using parameters
bookRoutes.get("/:bookId", async (req, res, next) => {
  const bookId = req.params.bookId;
  try {
    const findBook = await BookModel.findById({ _id: bookId }).select(
      "title author summary"
    );

    if (findBook) {
      res.send(findBook);
    } else {
      res.status(404).json({ error: "This book does not exist" });
    }
  } catch (error) {
    // Handle other potential errors here
    next(error);
  }
});

// this route is used to update the books details
bookRoutes.patch("/:bookId", authentication, async (req, res, next) => {
  const bookId = req.params.bookId;
  const loginUserId = req.body.userId;
  const dataWantToUpdate = req.body;
  try {
    const data = await BookModel.findOne({ _id: bookId }).populate(
      "userId",
      "_id"
    );
    if (data && data.userId && loginUserId === data.userId._id.toString()) {
      const updateData = await BookModel.findByIdAndUpdate(
        { _id: bookId },
        { ...dataWantToUpdate }
      );
      res.send(updateData);
    } else {
      return next(
        createHttpError.Unauthorized(
          "Access to this resource is not allowed for the current user."
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

// this route is used to delete the books by the id and to the related user
bookRoutes.delete("/:bookId", authentication, async (req, res, next) => {
  const bookId = req.params.bookId;
  const loginUserId = req.body.userId;
  try {
    const data = await BookModel.findOne({ _id: bookId }).populate(
      "userId",
      "_id"
    );
    if (data && data.userId && loginUserId === data.userId._id.toString()) {
      const deleteBook = await BookModel.findByIdAndDelete({ _id: bookId });
      res.send("Book deleted");
    } else {
      return next(
        createHttpError.Unauthorized(
          "Access to this resource is not allowed for the current user."
        )
      );
    }
  } catch (error) {
    console.log("ddd");
    next(error);
  }
});

module.exports = bookRoutes;
