const mongoose = require("mongoose");

const paymentHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Payment history must have a user"],
    },
    scholarship: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Payment history must have a scholarship"],
    },
    transactionId: {
      type: String,
      required: [true, "Payment history must have a transaction id"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Payment history must have a fee"],
    },
    currency: {
      type: String,
      required: [true, "Payment history must have currency"],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentHistorySchema);

module.exports = Payment;
