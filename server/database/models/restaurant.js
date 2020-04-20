const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  ownerName: {
    type: String,
    require: [true, "Name of business owner is required"],
  },
  businessName: {
    type: String,
    require: [true, "Name of business is required"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
  },
  address: {
    type: String,
    require: [true, "Address is required"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
  },
  bankAccount: {
    type: String,
    default: "",
  },
  latitude: {
    type: Number,
    default: 0,
  },
  longitude: {
    type: Number,
    default: 0,
  },
});

const Restaurant = mongoose.model("restaurant", RestaurantSchema);

module.exports = Restaurant;
