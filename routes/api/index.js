const router = require("express").Router();
const validateAccessToken = require("../../middlewares/jwt_validation");

// import routes and middlewares

const authRoutes = require("./auth");
const postRoutes = require("./post");
const userRoutes = require("./user.route.js");
const meRoutes = require("./me");
const messageRoutes = require("./message.js");

router.use("/auth", authRoutes);
router.use("/post", validateAccessToken, postRoutes);
router.use("/me", validateAccessToken, meRoutes);
router.use("/user", validateAccessToken, userRoutes);
router.use("/message", validateAccessToken, messageRoutes);

module.exports = router;
