const express = require("express");
const connection = require("./config/db");
const app = express();
const createHttpError = require("http-errors");
const userRouter = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");
require("dotenv").config();

app.use(express.json());

// this route is for checking
app.get("/", (req, res) => {
  res.send("Brew_App_Assignment");
});

app.use("/user", userRouter);
app.use("/books", bookRoutes);

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist"));
});

// error handling
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to the Database!");
    console.log(`listening on port ${process.env.PORT}`);
  } catch (error) {
    next(error);
  }
});
