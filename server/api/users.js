const express = require("express");
const router = express.Router();

// router.use("/", (req, res, next) => {
//   console.log("user api called");
// });

router.get("/", (req, res, next) => {
  res.send({ type: "GET" });
});

module.exports = router;
