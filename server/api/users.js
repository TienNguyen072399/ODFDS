const express = require("express");
const router = express.Router();
const cors = require("cors");

//Models
const Driver = require("../database/models/driver");
const Restaurant = require("../database/models/restaurant");

router.get("/", (req, res, next) => {
  res.send({ type: "GET" });
});

/*How to use mongoDB via mongoose
In the database/models folder, there are 2 files...
driver.js and restaurant.js
Those are templates that mongodb is going to use when creating a new entry in the db
When creating a driver, u want to call the driver model, which is imported as Driver
Using the Driver.create(req.body) method, it will make an entry in the database pulling all the info from req.body
Note: the information variables in req.body needs to match the variable names in the template
If the entry is successfully created, it will send back the user information from the db

Ex.

Driver.create(req.body) //Creates entry in db
  .then(user => {     //this is the db return successful db entry
    res.send(message: "Account has been created") //Sending back a successful message
  })
  .catch(next)  //Catches any errors that occur


Other useful methods
findOne({fieldLookingFor: req.body.fieldLookingFor}, 
  .then(user) => {  //Returns user from the db, if what you are looking for does not exist, it will return {}
      if(user) {        //If user is {}, this statement will be false
        do something
      }
      else {
        do something
      }
  
  })
*/

router.post("/registration", cors(), (req, res, next) => {
  console.log(req.body);
  let type = req.body.type;

  if (type == "business") {
    Restaurant.findOne({ email: req.body.email }).then((user) => {
      //Email exist
      if (user) {
        console.log("email exist");
        res.send({
          error: "An account exist under this email. Please try another email",
        });
      } else {
        Restaurant.create(req.body).then((user) => {
          if (user) {
            console.log(user);
            res.send({ user });
          } else {
            res.send({ error: "Signup failed" });
          }
        });
      }
    });
  } else {
    Driver.findOne({ email: req.body.email }).then((user) => {
      //Email exist
      if (user) {
        console.log("email exist");
        res.send({
          error: "An account exist under this email. Please try another email",
        });
      } else {
        Driver.create(req.body).then((user) => {
          if (user) {
            console.log(user);
            res.send({ user });
          } else {
            res.send({ error: "Signup failed" });
          }
        });
      }
    });
  }
});

//Login API
router.post("/login", (req, res, next) => {
  let type = req.body.type;
  if (type == "business") {
    Restaurant.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        res.send({ user });
        //Password check, need registration done first
      } else {
        res.send({ error: "cannot find user" });
      }
    });
  } else {
    Driver.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        res.send({ user });
        //Password check, need registration done first
      } else {
        res.send({ error: "cannot find user" });
      }
    });
  }
});

module.exports = router;
