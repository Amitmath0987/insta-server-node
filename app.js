const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = 5000;
// set up mongoose connection
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");

// importing routes..

mongoose.connect(
  MONGOURI,

  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("DB Not Connected");
    } else {
      console.log("DB Connected");
    }
  }
);
// mongoose.connection.on("connected", () => {
//   console.log("connected to mongoose");
// });
// mongoose.connection.on("connected", (err) => {
//   console.log("err connecting", err);
// });
require("./models/user");
require("./models/post");

// first parse the incoming request before going to route.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});
app.use(express.json());

const routes = require("./routes");
app.use(routes);

app.listen(PORT, () => {
  console.log(`server is Running on ${PORT}`);
});
