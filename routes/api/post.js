const express = require("express");
const postController = require("../../controllers/postController");
const getPostsController = require("../../controllers/getPostsController");
const getMyPostsController = require("../../controllers/getMyPostsController");

const router = express.Router();
const validateAccessToken = require("../../middlewares/jwt_validation");

router.post("/createpost", postController);
router.get("/post", getPostsController);
router.get("/mypost", getMyPostsController);

module.exports = router;
