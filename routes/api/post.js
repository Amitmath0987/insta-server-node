const express = require("express");
const postController = require("../../controllers/post/postController");
const getPostsController = require("../../controllers/post/getPostsController");
const getMyPostsController = require("../../controllers/post/getMyPostsController");

const router = express.Router();
const validateAccessToken = require("../../middlewares/jwt_validation");

router.post("/create", postController);
router.get("/post", getPostsController);
router.get("/mypost", getMyPostsController);

module.exports = router;
