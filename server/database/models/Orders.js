const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    businessName: {
        type: String,
        require: [true, "Name of business is required"],
    },
    address: {
        type: String,
        require: [true, "Address is required"],
    },
    customerName: {
        type: String,
        require: [true, "Name of customer is required"],
    },
    deliveryAddress: {
        type: String,
        require: [true, "Delivery Address is required"],
    },
    assigned: {},

    timePickUp: {
        type: String,
        default: "",
    },
    timeDelivered: {
        type: String,
        default: "",
    },
});

const Orders = mongoose.model("orders", OrdersSchema);

module.exports = Orders;