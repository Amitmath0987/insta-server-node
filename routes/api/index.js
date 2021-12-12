const router = require("express").Router();

// import routes and middlewares

const authRoutes = require("./auth");
const postRoutes = require("./post");
router.use("/auth", authRoutes);
router.use("/post", postRoutes);

module.exports = router;
