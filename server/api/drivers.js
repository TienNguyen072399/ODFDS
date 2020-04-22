const express = require("express");
const router = express.Router();
const cors = require("cors");
const Orders = require("../database/models/orders");
const Restaurant = require("../database/models/restaurant");
const https = require("https");
const util = require("util");
const calculateDistance = () => {};

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
        error: "We were not able to process your order. Please try again.",
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
        error: "We were not able to process your order. Please try again.",
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

  //Check if how many orders the user has
  await Orders.find({ driverId: req.body.driverId }).then(async (orders) => {
    //Prevents more than 2 orders at once
    if (orders.length === 2) {
      res.send({
        error:
          "You already have 2 deliveries in progress. Please complete them before accepting another order.",
      });
    } else if (orders.length === 1) {
      //Find the order details
      await Orders.findById({ _id: req.body.orderId }).then(async (order) => {
        //Check if from same restaurant
        if (order.businessId !== orders[0].businessId) {
          res.send({
            error:
              "You can only accept a second order if it is from the same restaurant.",
          });
        } else {
          console.log("Same restaurant");

          let restaurantLat;
          let restaurantLong;
          let firstLat;
          let firstLong;
          let secondLat;
          let secondLong;
          let distFromRestToFirst;
          let distFromFirstToSecond;

          //Get restaurant lat and long
          await Restaurant.findById({ _id: orders[0].businessId }).then(
            (restaurant) => {
              restaurantLat = restaurant.latitude;
              restaurantLong = restaurant.longitude;
            }
          );

          //First delivery location lat and long
          firstLat = orders[0].latitude;
          firstLong = orders[0].longitude;
          secondLat = order.latitude;
          secondLong = order.longitude;

          console.log(`Restaurant: ${restaurantLat}, ${restaurantLong}`);
          console.log(`First Delivery: ${firstLat}, ${firstLong}`);
          console.log(`Second Delivery: ${secondLat}, ${secondLong}`);

          let optionOne = {
            host: "api.mapbox.com",
            path: `/directions/v5/mapbox/driving-traffic/${restaurantLong},${restaurantLat};${firstLong},${firstLat}?access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg`,
            method: "GET",
          };

          let optionTwo = {
            host: "api.mapbox.com",
            path: `/directions/v5/mapbox/driving-traffic/${firstLong},${firstLat};${secondLong},${secondLat}?access_token=pk.eyJ1IjoibmdvdGhhb21pbmg5MCIsImEiOiJjazkwdnVhdmIwNXAyM2xvNmd0MnFsdXJlIn0.mT75xgKIwKFgt8BdWGouCg`,
            method: "GET",
          };

          //Get distance between restaurant and first delivery location using mapbox
          let responseString = "";
          await new Promise((resolve, reject) => {
            const requ = https.request(optionOne, async (res) => {
              console.log(`statusCode: ${res.statusCode}`);

              res.on("data", (d) => {
                responseString += d;
              });

              res.on("close", () => {
                responseString = JSON.parse(responseString);
                resolve(responseString);
              });
            });
            req.on("error", (error) => {
              console.love(error);
              reject(error);
            });
            requ.end();
          });
          distFromRestToFirst = (
            responseString.routes[0].distance * 0.000621371
          ).toFixed(2);

          console.log(distFromRestToFirst);

          //Get distance from first location to second location
          responseString = "";
          await new Promise((resolve, reject) => {
            const requ = https.request(optionTwo, async (res) => {
              console.log(`statusCode: ${res.statusCode}`);

              res.on("data", (d) => {
                responseString += d;
              });

              res.on("close", () => {
                responseString = JSON.parse(responseString);
                resolve(responseString);
              });
            });
            req.on("error", (error) => {
              console.love(error);
              reject(error);
            });
            requ.end();
          });
          distFromFirstToSecond = (
            responseString.routes[0].distance * 0.000621371
          ).toFixed(2);

          console.log(distFromFirstToSecond);

          //Distance from first to second location is not more than original delivery
          if (distFromFirstToSecond < distFromRestToFirst) {
            //Check if the order was taken at the same moment
            await Orders.findById({ _id: req.body.orderId }).then(
              async (order) => {
                if (order.assigned) {
                  res.send({ error: "Request to accept the order has failed." });
                } else {
                  await Orders.findByIdAndUpdate(
                    { _id: req.body.orderId },
                    {
                      assigned: req.body.driverName,
                      driverId: req.body.driverId,
                      status: "Waiting for pickup",
                    }
                  );
                  await Orders.findById({ _id: req.body.orderId }).then(
                    (order) => {
                      if (order) {
                        if (order.assigned) {
                          console.log(order.assigned);
                          res.send({ success: "You have accepted the order!" });
                        } else {
                          res.send({
                            error: "Request to accept the order failed.",
                          });
                        }
                      }
                    }
                  );
                }
              }
            );
          }
          //Distance from first to second is greater than original delivery
          else {
            res.send({
              error:
                "The distance from the your first delivery to this order is greater than the distance from the restaurant to your first delivery.",
            });
          }
        }
      });
    } else {
      //First order
      await Orders.findById({ _id: req.body.orderId }).then(async (order) => {
        if (order.assigned) {
          res.send({ error: "Request to accept the order has failed." });
        } else {
          await Orders.findByIdAndUpdate(
            { _id: req.body.orderId },
            {
              assigned: req.body.driverName,
              driverId: req.body.driverId,
              status: "Waiting for pickup",
            }
          );
          await Orders.findById({ _id: req.body.orderId }).then((order) => {
            if (order) {
              if (order.assigned) {
                console.log(order.assigned);
                res.send({ success: "You have accepted the order!" });
              } else {
                res.send({ error: "Request to accept the order failed." });
              }
            }
          });
        }
      });
    }
  });
});

function calc_dist(lat1, lon1, lat2, lon2) {
  let pi = Math.PI;
  var R = 6371e3; // metres
  var phi1 = (lat1 * pi) / 180;
  var phi2 = (lat2 * pi) / 180;
  var phidifference = ((lat2 - lat1) * pi) / 180;
  var lamdadifference = ((lon2 - lon1) * pi) / 180;

  var a =
    Math.sin(phidifference / 2) * Math.sin(phidifference / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(lamdadifference / 2) *
      Math.sin(lamdadifference / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c * 0.000621371;
  return d.toFixed(2);
}

module.exports = router;
