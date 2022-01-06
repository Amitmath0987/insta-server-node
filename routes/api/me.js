const express = require("express");
const getUser = require("../../controllers/getUser");

const router = express.Router();

// get user detail
router.get("/", getUser);

module.exports = router;
