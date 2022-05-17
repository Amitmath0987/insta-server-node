const Conversation = require("../../models/conversation");
const createError = require("http-errors");

const createConverSation = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { usersList, type, groupName } = req.body;
  try {
    if (!usersList) {
      throw createError.BadRequest("usersList is required");
    }
    if (usersList?.length < 1) {
      throw createError.BadRequest(
        "Minimum two users is required to perform chat."
      );
    }
    let isConversationExist = "";
    const checkIsConverSationExist = async (usersList = [], type) => {
      isConversationExist = await Conversation.findOne({
        type: type,
        members: { $all: usersList },
      });
      return isConversationExist ? true : false;
    };
    await checkIsConverSationExist(usersList, type);
    let newConversation;
    if (isConversationExist) {
      const populatedConversation = await Conversation.populate(
        isConversationExist,
        {
          path: "members",
          select: "name email",
        }
      );
      return res.status(200).json({
        message: "success",
        exists: true,
        data: {
          conversation_id: populatedConversation._id,
          type: populatedConversation.type,
          groupName: populatedConversation.groupName,
          members: populatedConversation.members,
          createdAt: populatedConversation.createdAt,
          updatedAt: populatedConversation.updatedAt,
        },
      });
    } else {
      let converSationData = {
        members: usersList,
        type: type,
        admin: userId,
      };
      if (type === "group") {
        converSationData.groupName = groupName;
      }
      newConversation = new Conversation(converSationData);
    }

    const savedConversation = await newConversation.save();
    if (!savedConversation) {
      throw createError.InternalServerError(
        "Something went wrong Please contact support."
      );
    }
    const populatedConversation = await Conversation.populate(newConversation, {
      path: "members",
      select: "name email",
    });
    return res.status(200).json({
      message: `${type} conversation created successfully.`,
      data: {
        conversation_id: populatedConversation?._id,
        members: populatedConversation?.members,
        type: populatedConversation?.type,
        groupName: populatedConversation?.groupName,
        lastMessage: populatedConversation?.lastMessage,
        admin: populatedConversation?.admin,
      },
    });

    // const user = User.aggregate([
    //   {
    //     $match: {
    //       _id: { $in: [userId, receiverId] },
    //     },
    //   },
    //   {
    //     $facet: {
    //       user: [
    //         { $sort: { createdAt: -1 } },
    //         { $skip: start },
    //         { $limit: viewSize },
    //         {
    //           $project: {
    //             _id: 1,
    //             name: 1,
    //             email: 1,
    //             avatar: 1,
    //           },
    //         },
    //       ],
    //     },
    //   },
    // ]);
  } catch (error) {
    console.log("Error createConverSation:", error);
    next(error);
  }
};
module.exports = createConverSation;
