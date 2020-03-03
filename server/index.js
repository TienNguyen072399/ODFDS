const bodyParser = require("body-parser");
const express = require("express");

const app = express();

let server = app.listen(3000, () => {
  console.log("Listening on port 3000");
});

//Body Parser middleware
app.use(bodyParser.json());

//Initialize route for general user (middleware)
app.use("/api/users", require("./api/users"));

// //Initialize route for drivers (middleware)
app.use("/api/drivers", require("./api/drivers"));

// //Initialize route for restaurants (middleware)
app.use("/api/restaurants", require("./api/restaurants"));

//Error handling middlware
app.use(function(err, req, res, next) {
  //   console.log(err);
  res.status(422).send({ error: err.message });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
