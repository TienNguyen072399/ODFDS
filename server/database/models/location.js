const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    street: {
        type: String,
        require: [true, "street of business owner is required"]
    },
    city: {
        type: String,
        require: [true, "city is required"]
    },
    zipcode: {
        type: String,
        require: [true, "zipcode is required"]
    },
    lattitude: {
        type: String,
        require: [true, "lattitude is required"]
    },
    longitude: {
        type: String,
        require: [true, "longitude is required"]
    }
});

const Location = mongoose.model("location", LocationSchema);

module.exports = Location;
