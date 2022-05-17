const Conversation = require("../../models/conversation");
const createError = require("http-errors");
const {
  createConversationValidation,
} = require("../../services/validation_schema");

const createConverSation = async (req, res, next) => {
  const { _id: userId } = req.user;
  // const { usersList, type, groupName } = req.body;
  try {
    // step1:validate the request
    let validatedData = await createConversationValidation.validateAsync(
      req.body
    );
    const { usersList, type, groupName } = validatedData;
    if (usersList?.length > 2 && type === "single") {
      throw createError.BadRequest(
        "You can't create a single conversation with more than 2 users"
      );
    }
    // if (!usersList) {
    //   throw createError.BadRequest("usersList is required");
    // }
    // if (usersList?.length < 1) {
    //   throw createError.BadRequest(
    //     "Minimum two users is required to perform chat."
    //   );
    // }

    // step2: check if the user is already in the conversation
    let isConversationExist = await Conversation.findOne({
      type: type,
      members: { $all: usersList },
    });
    let newConversation;
    // step3: if the user is in the conversation then return the conversation.
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
    }
    // step4: if the user is not in the conversation then create a new conversation
    else {
      let converSationData = {
        members: usersList,
        type: type,
        admin: userId,
      };
      // if group then add groupName
      if (type === "group") {
        converSationData.groupName = groupName;
      }
      newConversation = new Conversation(converSationData);

      const savedConversation = await newConversation.save();
      if (!savedConversation) {
        throw createError.InternalServerError(
          "Something went wrong Please contact support."
        );
      }
      const populatedConversation = await Conversation.populate(
        newConversation,
        {
          path: "members",
          select: "name email",
        }
      );
      // step5: return the new conversation
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
    }

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
