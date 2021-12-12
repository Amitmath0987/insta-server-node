const router = require("express").Router();
// const createError = require("http-errors");

const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use("/api", (req, res, next) => {
  next("The route you are trying to access does not exist.");
});

router.use((error, req, res, next) => {
  console.log(error, "error");
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error || "Internal Server Error",
    },
  });
});

module.exports = router;
