const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//Connect to mongodb via mongoose
mongoose.connect(
  "mongodb+srv://ODFDS:CS160group3@cluster0-jyaj4.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

let server = app.listen(5000, () => {
  console.log("Listening on port 5000");
});

app.options("*", cors()); // include before other routes

//Body Parser middleware
app.use(bodyParser.json());

//Initialize route for general user (middleware)
app.use("/api/users", require("./api/users"));

// //Initialize route for drivers (middleware)
app.use("/api/drivers", require("./api/drivers"));

// //Initialize route for restaurants (middleware)
app.use("/api/restaurants", require("./api/restaurants"));

//Error handling middlware
app.use(function (err, req, res, next) {
  //   console.log(err);
  res.status(422).send({ error: err.message });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
