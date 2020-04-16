const express = require("express");
const router = express.Router();
const cors = require("cors");


//Models
const Driver = require("../database/models/driver");
const Restaurant = require("../database/models/restaurant");
const Requests = require("../database/models/request");
const BankInfo = require("../database/models/bankinfo");
const Location = require("../database/models/location");
const Orders = require("../database/models/Order");

router.get("/", (req, res, next) => {
  res.send({ type: "GET" });
});

router.put("/order/get-order", cors(), (req, res, next) => {
    //in req, there will be some delievery information, business name?
    //find 
});

module.exports = router;
