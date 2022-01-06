const mongoose = require("mongoose");
const createError = require("http-errors");
const User = mongoose.model("User");
const getUser = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const userDetails = await User.findOne({ _id: userId });
    console.log(userDetails, "userDetails");
    if (!userDetails) {
      throw createError.InternalServerError("User details can not be fetched.");
    }
    const sanitizeUserDetails = {
      _id: userDetails?._id,
      name: userDetails?.name,
      email: userDetails?.email,
    };
    res.status(200).json({
      message: "success",
      data: sanitizeUserDetails,
    });
  } catch (error) {
    console.log("Error getUser:", error);
    next(error);
  }
};

module.exports = getUser;
