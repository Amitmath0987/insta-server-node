const Conversation = require("../../models/conversation");

const getConverSationList = async (req, res) => {
  const { _id: userId } = req.user;
  const start = (req.query.start && parseInt(req.query.start)) || 0;
  const viewSize = (req.query.limit && parseInt(req.query.limit)) || 10;

  try {
    const data = await Conversation.aggregate([
      {
        $match: {
          members: { $in: [userId] },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "members",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
              },
            },
          ],
          as: "members",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "admin",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
              },
            },
          ],
          as: "admin",
        },
      },
      {
        $facet: {
          count: [{ $count: "totalCount" }],
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: start },
            { $limit: viewSize },
            {
              $project: {
                _id: 1,
                members: 1,
                type: 1,
                groupName: 1,
                lastMessage: 1,
                admin: 1,
              },
            },
          ],
        },
      },
    ]);
    res.status(200).json({
      message: "success",
      totalCount: data[0]?.count[0].totalCount,
      count: data[0]?.data?.length,
      data: data[0]?.data,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};

module.exports = getConverSationList;
