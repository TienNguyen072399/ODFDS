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

router.post("/order/submit", function (req, res, next) {
    var id = req.body.id;
    res.redirect('/' + id);
});
//to get an order, creates an order and 
router.post("/order/start", cors(), (req, res, next) => {
    //req will have email, request time

    //

    //code below finds the restaurant id and saves it
    Business.findOne({email: req.body.email}).then((user) => {
        if (user) {
            console.log("restaurant found");

            //calculating cost, 5 is base cost
            let cost_order = 5;

            //have to get starting and ending location from map api
            //may we can also get the distance from the two locations from the map api
            //worse case, we only get longitude and lattitude
            //get longitude and latitude 
            let sloc = { latitude: "1", longitude: "2" };
            let endloc = { latitude: "1", longitude: "2" };
            let lat1 = sloc.latitude;
            let lon1 = sloc.longitude;
            let lat2 = endloc.latitude;
            let lon2 = endloc.longitude;


            //doing the calculations of cost for one order
            miles = calc_dist(lat1, lon1, lat2, lon2);
            cost_order = calc_costs(miles);
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
            //no cost

            //assigned is drivers name, hopefully req will have customer name and delivery address
            let arequest = new Orders({
                businessName: user.businessName,
                address: "business address",
                customerName: req.customerName,
                delieveryAddress: req.deliveryAddress,
                assigned: "",
                timePickUp: "",
                timeDelivered: "",
                cost: ""
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
            res.send({ error: "noo restaurant found" });
        }
    });

});
router.put("/order/confirm", cors(), (req, res, next) => {
    //this is when the driver confirms the order, req will send the drivers name and business name
    //finds the drivers id by name
    Driver.findOne({ name: req.body.name }).then((user) => {
        if (user) {
            //update orderto have driver name, user in this case is the driver found
            Orders.findOneAndUpdate({ businessName: user.businessName }, { assigned: user.}, {
                new: true
            }).then((user) => {
                if (user) {
                    console.log("good");
                } else {
                    res.send({ error: "no request found" });
                }
            });
        } else {
            res.send({ error: "no request found" });
        }
    });
});
router.put("/order/pickup", cors(), (req, res, next) => {
    //updating request

    //req sends in driver email and request time
    //finds and update based off request id, not sure how to get the server time
    Driver.findOne({ name: req.body.name  }).then((user) => {
        if (user) {
            Request.findOneAndUpdate({ assigned: user.name }, { timePickUp: req.body.date }, {
                new: true
            }).then((user) => {
                if (user) {
                    console.log("good");
                } else {
                    res.send({ error: "no request found" });
                }
            });
        } else {
            res.send({ error: "no request found" });
        }
    });
});
router.put("/order/done", cors(), (req, res, next) => {
    //finishing request
       //req sends in driver email and request time
    //var date = new Date();
    //finds and update based off request id, 
    Driver.findOne({ name: req.body.name }).then((user) => {
        if (user) {
            //update request end time
            Request.findOneAndUpdate({ assigned: user.name }, { timeDelivered: req.body.date }, {
                new: true
            }).then((user) => {
                if (user) {
                    console.log("good");
                } else {
                    res.send({ error: "no request found" });
                }
            });
        }
    });
});
//calculate costs of 1 order
function calc_costs(miles) {
    //calculating cost, 5 is base cost
    let cost_order = 5;

    if (miles <= 1)
        cost_order = 5;
    else
        cost_order = cost_order + (miles * 2);
    return cost_order;
}
//calculate distance from two points
function calc_dist(lat1,lon1, lat2,lon2) {
    var R = 6371e3; // metres
    var phi1 = lat1.toRadians();
    var phi2 = lat2.toRadians();
    var phidifference = (lat2 - lat1).toRadians();
    var lamdadifference = (lon2 - lon1).toRadians();

    var a = Math.sin(phidifference / 2) * Math.sin(phidifference / 2) +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(lamdadifference / 2) * Math.sin(lamdadifference / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;
    return d;
}
module.exports = router;
