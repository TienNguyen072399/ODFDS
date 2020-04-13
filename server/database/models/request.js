const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    bid: {
        type: String,
        require: [true, "Business id is required"]
    },
    startloc: {
        type: String,
        require: [true, "start location is required"]
    },
    endloc: {
        type: String,
        require: [true, "end location is required"]
    },
    requesttime: {
        type: String,
        require: [true, "request time is required"]
    },
    pickuptime: {
        type: String,
        default: ""
    },
    endtime: {
        type: String,
        default: ""
    },
    cost: {
        type: String,
        require: [true, "cost is required"]
    },
    status: {
        type: String,
        require: [true, "status is required"]
    }
});

const Request = mongoose.model("request", RequestSchema);

module.exports = Request;
