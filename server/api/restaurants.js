const express = require("express");
const router = express.Router();
const cors = require("cors");
const Orders = require("../database/models/orders");

const getTime = (hours, minutes) => {
  let hourText;
  let minuteText;
  let type;

  if (Math.floor(hours / 12) === 0) {
    type = "am";
  } else {
    type = "pm";
  }

  let tempHours = hours % 12;
  if (tempHours === 0) {
    tempHours = 12;
  }

  if (tempHours < 10) {
    hourText = "0" + tempHours;
  } else {
    hourText = tempHours;
  }

  if (minutes < 10) {
    minuteText = "0" + minutes;
  } else {
    minuteText = minutes;
  }
  return hourText + ":" + minuteText + " " + type;
};
// router.use("/", (req, res, next) => {
//   console.log("restaurant api called");
// });

router.get("/", (req, res, next) => {
  res.send({ type: "GET" });
});

router.post("/order/submit", cors(), function (req, res, next) {
  console.log(req.body);

  let orderTime = new Date();

  Orders.create({
    ...req.body,
    orderTime,
  }).then((order) => {
    if (order) {
      console.log(order);
      res.send({ success: "Your order has been inputed" });
    } else {
      res.send({
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
