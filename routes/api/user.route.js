const express = require("express");
const validateAccessToken = require("../../middlewares/jwt_validation");
const router = express.Router();
const getUsers = require("../../controllers/user/getUsers");
router.get("/", getUsers);
module.exports = router;
