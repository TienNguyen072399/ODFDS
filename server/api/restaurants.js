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

router.get("/orders/:id", cors(), (req, res, next) => {
    Orders.find({ businessId: req.params.id }).then((orders) => {
        console.log(orders);
        res.send(orders);
    });
});
//to get an order, creates an order and 
router.post("/order/start", cors(), (req, res, next) => {
    //req will have email, request time

    //

    //finds the restaurant from the name
    Business.findOne({email: req.body.email}).then((user) => {
        if (user) {
            console.log("restaurant found");


            //status should be not completed

            // wont have a pick up time or ending time yet, once driver picks up order or  finishes up the delivery
            // we will update request
            // pickuptime: req.body.pickuptime,
            // endtime: req.body.endtime,
            //no cost

            //assigned is drivers name, hopefully req will have customer name and delivery address
            let d = new Date();
            let hours = d.getHours();
            let minutes = d.getMinutes();
            let orderTime1 = hours + ":" + minutes;

            let arequest = new Orders({
                businessName: user.businessName,
                businessId: "",
                BusinessAddress: req.body.businessAddress,
                customerName: req.body.customerName,
                deliveryAddress: req.body.deliveryAddress,
                orderTime: orderTime1,
                assigned: "",
                timePickUp: "",
                timeDelivered: "",
                status: "waiting to be assigned",
                cost: ""
            });
            Orders.create(arequest).then((user) => {
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
//may not need this, request update can be done at drivers confirmation of order
router.put("/order/confirm", cors(), (req, res, next) => {
    //this is when the driver confirms the order, req will send the drivers name and business name
    //finds the drivers id by name
    //update order to have driver name, user in this case is the driver found
    Orders.findOneAndUpdate({ businessName: req.businessName}, { assigned: req.body.name}, {
        new: true
    }).then((user) => {
        if (user) {
            console.log("good");
            res.send("driver found");
        } else {
            res.send({ error: "no request found" });
        }
    });
});
//when the driver picks up the order, it updates the db on pickup time
router.put("/order/pickup", cors(), (req, res, next) => {
    //updating request
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let orderTime1 = hours + ":" + minutes;
    //req sends in driver email
    //finds and update based off drivers name(assigned), not sure how to get the server time
    Orders.findOneAndUpdate({ assigned: req.body.name }, { timePickUp: orderTime1 }, {
        new: true
    }).then((user) => {
        if (user) {
            console.log("good");
            res.send("driver found");
        } else {
            res.send({ error: "no request found" });
        }
    });
    Orders.findOneAndUpdate({ assigned: req.body.name }, { status: "driver picked up"}, {
        new: true
    }).then((user) => {
        if (user) {
            console.log("good");
            res.send("driver found");
        } else {
            res.send({ error: "no request found" });
        }
    });

});
router.put("/order/done", cors(), (req, res, next) => {
    //finishing request, calculate costs
       //req sends in driver name 
    //finds and update based off drivers name, 
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let orderTime1 = hours + ":" + minutes;
    Orders.findOneAndUpdate({ assigned: req.body.name }, { timeDelivered: orderTime1 }, {
        new: true
    }).then((user) => {
        if (user) {
            res.send("drivery completed");
            console.log("good");
        } else {
            res.send({ error: "no request found" });
        }
        });

    Orders.findOneAndUpdate({ assigned: req.body.name }, { status: "completed"}, {
        new: true
    }).then((user) => {
        if (user) {
            res.send("drivery completed");
            console.log("good");
        } else {
            res.send({ error: "no request found" });
        }
    });
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

    Orders.findOneAndUpdate({ assigned: user.name }, { cost: cost_order }, {
        new: true
    }).then((user) => {
        if (user) {
            res.send("drivery completed");
            console.log("good");
        } else {
            res.send({ error: "no request found" });
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
