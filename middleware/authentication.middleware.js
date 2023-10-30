const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(createHttpError.Unauthorized("Token is missing"));
    } else {
      jwt.verify(token, "ALPHA", (error, response) => {
        if (error) return next(createHttpError.Unauthorized());
        else {
          req.body.userId = response.userId;
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
