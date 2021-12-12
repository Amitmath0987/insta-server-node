const createError = require("http-errors");
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const getMyPostsController = async (req, res, next) => {
  try {
    const posts = await Post.find({ postedBy: req.user.id }).populate(
      "postedBy",
      "name"
    );
    return res.status(200).json({ posts });
  } catch (error) {
    if (error) {
      error.status = 500;
      next(error);
    }
  }
};
module.exports = getMyPostsController;
