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
//driver picks up the order
router.put("/order/pick-up-order", cors(), (req, res, next) => {
    //updating request
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let orderTime1 = hours + ":" + minutes;
    //req sends in driver email
    //finds and update based off drivers name(assigned),
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
    Orders.findOneAndUpdate({ assigned: req.body.name }, { status: "driver picked up" }, {
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
//driver picks up the order
router.put("/order/order-delivered", cors(), (req, res, next) => {
    //updating request
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let orderTime1 = hours + ":" + minutes;
    //req sends in driver email
    //finds and update based off drivers name(assigned),
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
    Orders.findOneAndUpdate({ assigned: req.body.name }, { status: "completed" }, {
        new: true
    }).then((user) => {
        if (user) {
            console.log("good");
            res.send("driver found");
        } else {
            res.send({ error: "no request found" });
        }
    });

    //then we update costs too
    let sloc = { latitude: "1", longitude: "2" };
    let endloc = { latitude: "1", longitude: "2" };
    let lat1 = sloc.latitude;
    let lon1 = sloc.longitude;
    let lat2 = endloc.latitude;
    let lon2 = endloc.longitude;


    //doing the calculations of cost for one order
    miles = calc_dist(lat1, lon1, lat2, lon2);
    cost_order = calc_costs(miles);

    Orders.findOneAndUpdate({ assigned: req.body.name }, { cost: cost_order }, {
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
   //driver picks froma list of orders
router.put("/order/get-order", cors(), (req, res, next) => {
    //req will have business name and driver name, and order info?
    let num_orders = 0;
    //find all the orders with the drivers name
    Orders.find({ assigned: req.body.name }).then((order) => {

        num_orders = orders.length;
        console.log(orders.length);
        res.send(orders);
    });

    let thecost = 0;
    if (num_orders == 0) {
        //for single orders
        Orders.findOne({ businessName: req.body.businessName }, { assigned: req.body.name }, {
            new: true
        }).then((user) => {
            if (user) {
                console.log("good");
                res.send("driver found");
            } else {
                res.send({ error: "no request found" });
            }
        });
    } else if (num_orders == 1) { //this where we calculate the two orders
        //Each driver can pick up 1-2 different orders from the same restaurant but not from different restaurants.  
        //If 2 orders are being dispatch from the same restaurant to 2 different locations, 
        //the delivery cost of the 2nd order cannot be more than the cost of the original distance from the restaurant to the customer address. 

        //find an order with the drivers name
        Orders.findOne({ assigned: req.body.name }).then((order) => {
            //checks if order's restaurant name is the name as the one found in database
            if (order && (req.body.businessName == order.businessName)) {
                //calcuting cost of this order, 2nd order cannot be greater than this

                //calculating miles , hopefully can get distance from map api,
                // let miles = order.businessAddress- order.deliveryAddress;

                //temp miles
                let sloc = { latitude: "1", longitude: "2" };
                let endloc = { latitude: "1", longitude: "2" };
                let lat1 = sloc.latitude;
                let lon1 = sloc.longitude;
                let lat2 = endloc.latitude;
                let lon2 = endloc.longitude;

                let miles = calc_dist(lat1, lon1, lat2, lon2);

                let cost_order = calc_costs(miles);

                //calculating second order, still needs distance from map api
                let sloc2 = { latitude: "3", longitude: "10" };
                let endloc2 = { latitude: "3", longitude: "20" };
                lat1 = sloc2.latitude;
                lon1 = sloc2.longitude;
                lat2 = endloc2.latitude;
                lon2 = endloc2.longitude;

                let miles2 = calc_dist(lat1, lon1, lat2, lon2);
                let cost_order2 = calc_costs(miles2);

                if (cost_order2 < cost_order1) {
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
                }


            } else {
                res.send({ error: "no request found" });
            }
        });

    } else {
        //this is when orders is more than 2
        res.send("can not get more than two orders");
    }
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
function calc_dist(lat1, lon1, lat2, lon2) {
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
