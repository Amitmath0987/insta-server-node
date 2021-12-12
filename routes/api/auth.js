const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const registerUser = require("../../controllers/registerUser");
const login = require("../../controllers/login");
const validateAccessToken = require("../../middlewares/jwt_validation");

// router.get("/", (req, res) => {
//   res.send("hello");
// });
router.get("/protected", validateAccessToken, (req, res) => {
  const { user } = req;
  console.log("user11", user);
  res.send("hello");
});
router.post("/signup", registerUser);
router.post("/login", login);

module.exports = router;
