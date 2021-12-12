const createError = require("http-errors");
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const getPostsController = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("postedBy", "name");
    return res.status(200).json({ posts });
  } catch (error) {
    if (error) {
      error.status = 500;
      next(error);
    }
  }
};
module.exports = getPostsController;
