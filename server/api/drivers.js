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
    //in req, there will be some delievery information, business name
    //find 

    //in res send name of driverd
    //this should be in driver
    let thecost = 0;
    if (req.body.numorder == "2") {
        if (req.body.res1 == req.body.res2) {
            //doing cost
            let cost_order1 = 5;
            let sloc1 = 3;
            let endloc1 = 20;
            let miles1 = endloc1 - sloc1;
            if (miles1 <= 1)
                cost_order1 = 5;
            else
                cost_order1 = cost_order1 + (miles1 * 2);

            let cost_order2 = 5;
            let sloc2 = 3;
            let endloc2 = 20;
            let miles2 = endloc2 - sloc2;
            if (miles2 <= 1)
                cost_order2 = 5;
            else
                cost_order2 = cost_order2 + (miles2 * 2);

            if (cost_order2 < cost_order1) {
                thecost = cost_order1 + cost_order2;
                console.log("good");
                console.log(thecost);
            } else {
                console.log("error");
            }



        }
    }
});

module.exports = router;
