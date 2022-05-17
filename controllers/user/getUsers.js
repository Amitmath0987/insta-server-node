const User = require("../../models/user");

// add controller to get all users in the database with search and pagination and return them in json format in the response body of the request.
const getUsers = async (req, res, next) => {
  try {
    const { keyword } = await req.query;
    const start = (req.query.start && parseInt(req.query.start)) || 0;
    const viewSize = (req.query.limit && parseInt(req.query.limit)) || 10;
    const searchCriteria = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};
    // write aggregate to get all users in the database.
    const users = await User.aggregate([
      {
        $match: searchCriteria,
      },
      {
        $match: {
          _id: { $ne: req.user._id },
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
                name: 1,
                email: 1,
                avatar: 1,
              },
            },
          ],
        },
      },
    ]);
    res.status(200).json({
      message: "success",
      totalCount: users[0]?.count[0]?.totalCount,
      count: users[0]?.data.length,
      data: users[0]?.data,
    });
  } catch (error) {
    console.log("Error getUsers:", error);
    next(error);
  }
};
module.exports = getUsers;
