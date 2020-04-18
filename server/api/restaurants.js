const express = require("express");
const router = express.Router();
const cors = require("cors");
const Orders = require("../database/models/orders");

// router.use("/", (req, res, next) => {
//   console.log("restaurant api called");
// });

router.get("/", (req, res, next) => {
  res.send({ type: "GET" });
});

router.post("/order/submit", cors(), function (req, res, next) {
  console.log(req.body);
  // let d = new Date();
  // let date = d.getDate();
  // let hours = d.getHours();
  // let minutes = d.getMinutes();
//  let orderTime = hours + ":" + minutes;
  let orderTime = new Date();
  Orders.create({
    ...req.body,
    orderTime,
  }).then((order) => {
    if (order) {
      console.log(order);
      res.send({ success: "Your order has been inputed" });
    } else {
      console.log({
        error: "We were not able to process your order. Please try again",
      });
    }
  });
});

router.get("/orders/:id", cors(), (req, res, next) => {
  Orders.find({ businessId: req.params.id }).then((orders) => {
    console.log(orders);
    res.send(orders);
  });
});

module.exports = router;
