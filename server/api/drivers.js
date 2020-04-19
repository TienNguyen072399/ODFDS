const express = require("express");
const router = express.Router();
const cors = require("cors");
const Orders = require("../database/models/orders");

router.get("/", (req, res, next) => {
  res.send({ type: "GET" });
});

//Gets all open orders from DB
router.get("/orders", cors(), (req, res, next) => {
  orderList = [];
  console.log("getting orderes");
  // res.send({ test: "" });
  Orders.find({}).then((orders) => {
    if (orders) {
      // console.log(orders);
      for (let i = 0; i < orders.length; i++) {
        if (!orders[i].assigned) {
          orderList.push(orders[i]);
        }
      }
      console.log(orderList);
      res.send(orderList);
    } else {
      res.send({
        error: "We were not able to process your order. Please try again",
      });
    }
  });
});

//Get orders that the driver accepted
router.get("/myorders/:id", cors(), (req, res, next) => {
  console.log("getting orders");
  // res.send({ test: "" });
  Orders.find({ driverId: req.params.id }).then((orders) => {
    if (orders) {
      // console.log(orders);
      res.send(orders);
    } else {
      res.send({
        error: "We were not able to process your order. Please try again",
      });
    }
  });
});

//Assigns a driver to an order
router.put("/order/accept", cors(), async (req, res, next) => {
  //this is when the driver confirms the order, req will send the drivers name and business name
  //finds the drivers id by name
  //update order to have driver name, user in this case is the driver found

  console.log(req.body);

  await Orders.findByIdAndUpdate(
    { _id: req.body.orderId },
    { assigned: req.body.driverName, driverId: req.body.driverId }
  );

  await Orders.findById({ _id: req.body.orderId }).then((order) => {
    if (order) {
      if (order.assigned) {
        console.log(order.assigned);
      } else {
        console.log("failed to update");
      }
    }
  });
});

module.exports = router;
