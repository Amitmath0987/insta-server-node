require("dotenv").config();

module.exports = {
  MONGOURI:
    "mongodb+srv://Amit_mathur:KZATu3vAnEN18Tk7@cluster0.gzjx1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenLife: process.env.ACCESS_TOKEN_LIFE,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    // refreshTokenLife: process.env.REFRESH_TOKEN_LIFE,
  },
};
