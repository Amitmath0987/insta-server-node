const mongoose = require("mongoose");
const converSationSchema = new mongoose.Schema(
  {
    // members represents the users who are part of the conversation.
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    // type 'single' represents one-to-one chat between users, 'group' represents group chat
    type: {
      type: String,
      required: true,
      default: "single",
      enum: ["single", "group"],
    },
    groupName: {
      type: String,
    },
    //lastMessage represents the last message sent in the conversation.
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    // admin represents the user who created the conversation.
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    //readBy represents the users who have read the last message in the conversation.
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Conversation = mongoose.model("Conversation", converSationSchema);

// make this available to our users in our Node applications
module.exports = Conversation;
