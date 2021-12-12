const createError = require("http-errors");
const { createPostValidation } = require("../services/validation_schema");
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const postController = async (req, res, next) => {
  try {
    // validation code here
    if (!req?.body?.title || !req?.body?.body || !req?.body?.media) {
      throw createError.BadRequest("Please Add all fields.");
    }

    const result = await createPostValidation.validateAsync(req.body);
    const { title, body, media } = result;
    const post = await new Post({
      title: title,
      body: body,
      media: media,
      postedBy: req.user,
    });
    // Save user to DB
    const createdPost = await post.save();
    if (!createdPost)
      throw createError.InternalServerError(
        "Your request could not be processed. Please contact support or try again after some time."
      );
    res.status(200).json({ createdPost });
  } catch (error) {
    if (error) {
      console.log("post error:", error);
      error.status = 422;
      next(error);
    }
  }
};

module.exports = postController;
