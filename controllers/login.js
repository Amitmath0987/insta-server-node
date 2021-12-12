const mongoose = require("mongoose");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { loginValidation } = require("../services/validation_schema");
const { generateAccessToken } = require("../services/generate_token");
// const { accessTokenLife } = require("../keys").jwt;

const User = mongoose.model("User");

const login = async (req, res, next) => {
  try {
    const result = await loginValidation.validateAsync(req.body);
    const { email, password } = result;

    // check if user is registered.
    const userLogin = await User.findOne({ email: email });
    // email does not exist
    if (!userLogin) {
      throw createError.BadRequest(
        "This user is not registered,please signup."
      );
    }

    //  compare password with saved password
    const isMatch = await bcrypt.compare(password, userLogin.password);

    if (!isMatch) {
      throw createError.Unauthorized("Incorrect Password.");
    }
    console.log("userLogin", userLogin);
    const payload = {
      _id: userLogin?._id,
      name: userLogin?.name,
      email: userLogin?.email,
    };
    // create accessToken
    const accessToken = await generateAccessToken(payload);
    console.log("accessToken", accessToken);
    res.status(200).send({
      message: "Successfully login",
      token: accessToken,
      user: payload,
    });
  } catch (err) {
    console.log("error login: ", err);
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
module.exports = login;
