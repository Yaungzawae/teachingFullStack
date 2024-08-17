const mongoose = require("mongoose");

const PaymentSchema  = new mongoose.Schema({
    courseId: String,
    studentId: String,
    type: String,
    amount: Number,
    isAccepted: {
        type: Boolean,
        default: null
    },
    message: String,
    img: String
})

const Payments = mongoose.model("payments", PaymentSchema);



module.exports = Payments;