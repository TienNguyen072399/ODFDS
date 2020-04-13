const express = require("express");
const router = express.Router();
const cors = require("cors");
// router.use("/", (req, res, next) => {
//   console.log("restaurant api called");
// });

//Models
const Driver = require("../database/models/driver");
const Restaurant = require("../database/models/restaurant");
const Requests = require("../database/models/request");
const BankInfo = require("../database/models/bankinfo");
const Location = require("../database/models/location");

router.get("/", (req, res, next) => {
  //res.send({ req.params.id});
});

router.post("/order/submit", function (req, res, next) {
    var id = req.body.id;
    res.redirect('/' + id);
});
//to get an order
router.post("/order/start", cors(), (req, res, next) => {
    //req will have bid, status

    //startloc, endloc, requestime, pickuptime, endtime,cost will be found in server

    //it wont have a did because server can only handle drivers, 
    //so we find a driver in server

    //code below finds a driver and saves it
    Driver.findOne({}).then((user) => {
        if (user) {
            let adriver = user.id;
            console.log("driver found");

            //calculating cost, 5 is base cost
            let cost_order = 5;

            //have to get starting and ending location from map api
            let sloc = 3;
            let endloc = 20;

            //doing the calculations of cost for one order
            let miles = endloc - sloc;
            if (miles <= 1)
                cost_order = 5;
            else
                cost_order = cost_order + (miles * 2);

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

            //status should be not completed

            // wont have a pick up time or ending time yet, once driver picks up order or  finishes up the delivery
            // we will update request
            // pickuptime: req.body.pickuptime,
            // endtime: req.body.endtime,

            var date = new Date();
            //make a request ,then we save the request to the request model
            let arequest = new Request({
                bid: req.body.bid,
                did: user.id,
                startloc: sloc,
                endloc: endloc,
                requesttime: date,
                cost: cost_order,
                status: req.body.status 
            });
            Requests.create(arequest).then((user) => {
                if (user) {
                    console.log(user);
                    res.send({ user });
                } else {
                    res.send({ error: "request failed to send" });
                }
            });
            //notify driver of a request

        } else {
            res.send({ error: "no drivers availible" });
        }
    });

});
router.put("/order/pickup", cors(), (req, res, next) => {
    //updating request

    //it wont have a did because server can only handle drivers, 
    //so we find a driver in server
    var date = new Date();
    //finds and update based off request id, not sure how to get the server time
    Request.findOneAndUpdate({ id: req.body.id }, {pickuptime: date},{
        new: true
    }).then((user) => {
        if (user) {
            console.log("good");
        } else {
            res.send({ error: "no request found" });
        }
    });

});
router.put("/order/done", cors(), (req, res, next) => {
    //finishing request

    //it wont have a did because server can only handle drivers, 
    //so we find a driver in server
    var date = new Date();
    //finds and update based off request id, 
    Request.findOneAndUpdate({ id: req.body.id }, { endtime: date }, {
        new: true
    }).then((user) => {
        if (user) {
            console.log("good");
        } else {
            res.send({ error: "no request found" });
        }
        });
    Request.findOneAndUpdate({ id: req.body.id }, { status: "complete" }, {
        new: true
    }).then((user) => {
        if (user) {
            console.log("good");
        } else {
            res.send({ error: "no request found" });
        }
    });

});
module.exports = router;
