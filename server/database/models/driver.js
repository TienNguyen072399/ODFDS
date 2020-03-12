const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  name: {
    type: String,
    require: [true, "Name of business owner is required"]
  },
  email: {
    type: String,
    require: [true, "Email is required"]
  },
  vehicle: {
    type: String,
    require: [true, "Vehicle is required"]
  },
  password: {
    type: String,
    require: [true, "Password is required"]
  },
  bankAccount: {
    type: String,
    default: ""
  }
});

const Driver = mongoose.model("driver", DriverSchema);

module.exports = Driver;
