const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BankInfoSchema = new Schema({
    bankname: {
        type: String,
        require: [true, "Name of bank owner is required"]
    },
    accountno: {
        type: String,
        require: [true, "account number is required"]
    },
    routingno: {
        type: String,
        require: [true, "routing number is required"]
    },
    accname: {
        type: String,
        require: [true, "account name is required"]
    }
});

const BankInfo = mongoose.model("bankinfo", BankInfoSchema);

module.exports = BankInfo;
