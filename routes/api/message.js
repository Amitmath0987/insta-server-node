const express = require("express");
const createConverSation = require("../../controllers/message/createConversation");
const getConverSationList = require("../../controllers/message/getConverSationList");
const validateAccessToken = require("../../middlewares/jwt_validation");
const router = express.Router();

// create conversation
router.post("/conversation", validateAccessToken, createConverSation);

// get conversation
router.get("/conversation", validateAccessToken, getConverSationList);

// create group chat
// router.post("/groupchat", validateAccessToken, createGroupChat);

// rename group
// router.put("/groupchat", validateAccessToken, renameGroup);

// remove from group chat
// router.put("/groupchat", validateAccessToken, removeFromGroupChat);

//add to group chat
// router.put("/groupchat", validateAccessToken, addToGroupChat);

module.exports = router;
