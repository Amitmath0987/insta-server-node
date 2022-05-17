const mongoose = require("mongoose");
const createError = require("http-errors");
const User = mongoose.model("User");
const getUser = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const userDetails = await User.findOne({ _id: userId }).select(
      "-password -__v  "
    );
    console.log(userDetails, "userDetails");
    if (!userDetails) {
      throw createError.InternalServerError("User details can not be fetched.");
    }

    res.status(200).json({
      message: "success",
      data: userDetails,
    });
  } catch (error) {
    console.log("Error getUser:", error);
    next(error);
  }
};

module.exports = getUser;
