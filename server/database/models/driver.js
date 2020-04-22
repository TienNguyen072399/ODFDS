const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  name: {
    type: String,
    require: [true, "Name of driver is required."],
  },
  email: {
    type: String,
    require: [true, "Email is required."],
  },
  vehicle: {
    type: String,
    require: [true, "Vehicle is required."],
  },
  driversLicense: {
    type: String,
    require: [true, "Driver's liscence is required."],
  },
  password: {
    type: String,
    require: [true, "Password is required."],
  },
  bankAccount: {
    type: String,
    default: "",
  },
  latitude: {
    type: Number,
    default: 37.3317891,
  },
  longitude: {
    type: Number,
    default: -121.8823165,
  },
});

const Driver = mongoose.model("driver", DriverSchema);

module.exports = Driver;
