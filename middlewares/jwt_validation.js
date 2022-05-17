const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { accessSecret } = require("../keys").jwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const validateAccessToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw createError.Unauthorized("you must be logged in.");
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, accessSecret, async (err, decoded) => {
      try {
        if (err) {
          throw createError.BadRequest(err);
        }
        if (decoded) {
          const { _id } = await decoded;
          const user = await User.findById(_id).select("-password");
          req.user = user;
          next();
        }
      } catch (error) {
        if (error) {
          console.log("JsonWebTokenError:", error);
          error.status = 404;
          next(error);
        }
      }
    });
  } catch (error) {
    if (error) {
      console.log("error validatingJWT:", error);
      error.status = 401;
      next(error);
    }
  }
};

module.exports = validateAccessToken;
