const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const User = mongoose.model("User");
const { registerValidation } = require("../services/validation_schema");
const registerUser = async (req, res, next) => {
  try {
    // validation code here
    if (!req?.body?.email || !req?.body?.password || !req?.body?.name) {
      throw createError.BadRequest("please add all the fields to proceed.");
    }
    const result = await registerValidation.validateAsync(req.body);
    const { name, email, password } = result;

    // check for already registeration of email
    if (email) {
      const existingEmail = await User.findOne({
        email: email,
      });
      if (existingEmail) {
        throw createError.Conflict(
          `${email} is already registered. Please login.`
        );
      }
      // this runs when the user is new
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({
        email: email,
        password: hashedPassword,
        name: name,
      });
      // Save user to DB
      const createdUser = await user.save();
      if (!createdUser)
        throw createError.InternalServerError(
          "Your request could not be processed. Please contact support or try again after some time."
        );
      res.status(200).json({ message: "you have succesfully register." });
    }
  } catch (err) {
    console.log("error register: ", err);
    // if (error.isJoi === true) error.status = 422;
    // next(error);
    let error;

    if (err.details) {
      error = err.details.map((error) => {
        return {
          message: error.message,
        };
      });
    } else {
      error = err;
    }
    res.status(422).json({
      error,
    });
    return;
  }
};

module.exports = registerUser;
