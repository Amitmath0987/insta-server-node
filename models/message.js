const mongoose = require("mongoose");
const messageModel = models.schema(
  {
    sender: {
      // sender is the user who sent the message
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      // receiver is the user who received the message
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversation: {
      //  Conversation is the conversation in which the message was sent.
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    message: {
      // message is the actual message sent by the sender.
      type: String,
      required: true,
    },
    isRead: {
      // isRead is a boolean value which indicates whether the message is read or not.
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const message = mongoose.model("Message", messageModel);

module.exports = message;
