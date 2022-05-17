const createError = require("http-errors");
const formidable = require("formidable");
const cloudinary = require("cloudinary");
// const { createPostValidation } = require("../../services/validation_schema");
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const postController = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).send(err);
    }
    console.log(fields, "fields");
    console.log(files, "files");
  });
  // form.on("fileBegin", async (name, file) => {
  //   file.path = __dirname + "/../../public/uploads/" + file.name;
  // });
  // form.on("file", async (name, file) => {
  //   console.log(file.path);
  //   cloudinary.uploader.upload(file.path, async (result) => {
  //     console.log(result);
  //     const post = new Post({
  //       ...fields,
  //       image: result.url,
  //     });
  //     await post.save();
  //     res.status(200).send(post);
  //   });
  // });
};

// try {
//   // validation code here
//   if (!req?.body?.title || !req?.body?.body || !req?.body?.media) {
//     throw createError.BadRequest("Please Add all fields.");
//   }

//   const result = await createPostValidation.validateAsync(req.body);
//   const { title, body, media } = result;
//   const post = await new Post({
//     title: title,
//     body: body,
//     media: media,
//     postedBy: req.user,
//   });
//   // Save user to DB
//   const createdPost = await post.save();
//   if (!createdPost)
//     throw createError.InternalServerError(
//       "Your request could not be processed. Please contact support or try again after some time."
//     );
//   res.status(200).json({ createdPost });
// } catch (error) {
//   if (error) {
//     console.log("post error:", error);
//     error.status = 422;
//     next(error);
//   }
// }

module.exports = postController;
