const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    businessName: {
        type: String,
        require: [true, "Name of business is required"],
    },
    businessId: {
        type: String,
        require: [true, "Business Id is required"],
    },
    businessAddress: {
        type: String,
        require: [true, "Business Address is required"],
    },
    customerName: {
        type: String,
        require: [true, "Name of customer is required"],
    },
    deliveryAddress: {
        type: String,
        require: [true, "Delivery Address is required"],
    },
    orderTime: {
        type: String,
        default: "",
    },
    assigned: {
        type: String,
        default: "",
    },
    timePickUp: {
        type: String,
        default: "",
    },
    timeDelivered: {
        type: String,
        default: "",
    },
    cost: {
        type: String,
        default: "",
    }
});

const Orders = mongoose.model("orders", OrdersSchema);

module.exports = Orders;