const router = require("express").Router();
const validateAccessToken = require("../../middlewares/jwt_validation");

// import routes and middlewares

const authRoutes = require("./auth");
const postRoutes = require("./post");
const meRoutes = require("./me");
router.use("/auth", authRoutes);
router.use("/post", validateAccessToken, postRoutes);
router.use("/me", validateAccessToken, meRoutes);
module.exports = router;
