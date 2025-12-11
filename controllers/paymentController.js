require("@dotenvx/dotenvx").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const catchAsync = require("./../utils/catchAsync.js");
const Application = require("./../models/applicationModal.js");
const Scholarship = require("./../models/scholarshipsModel.js");
const Payment = require("./../models/paymentHistory.js");

exports.makePayment = catchAsync(async (req, res, next) => {
  const user = req.user;
  const applicationId = req.params.applicationId;
  const application = await Application.findById(applicationId);
  if (!application) {
    return res.status(404).json({
      status: "fail",
      message: "No application found for pay!",
    });
  }

  const scholarshipId = application.scholarship;
  const scholarship = await Scholarship.findById(scholarshipId);

  if (!scholarship) {
    return res.status(404).json({
      status: "fail",
      message: "No scholarship found, may expire this scholarship!",
    });
  }

  const price =
    Number(scholarship.applicationFees) +
    Number(scholarship.tuitionFees) +
    Number(scholarship.serviceCharge);

  const totalPrice = Math.round(price * 100);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: totalPrice,
          product_data: {
            name: `Please Pay for ${scholarship.scholarshipName}`,
          },
        },
        quantity: 1,
      },
    ],
    customer_email: user.email,
    metadata: {
      applicationId,
      userId: user.id,
      scholarshipId,
    },
    mode: "payment",
    success_url: `${process.env.DOMAIN_NAME}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN_NAME}/dashboard/payment-failed`,
  });

  res.status(200).json({
    status: "success",
    message: "successfully generate payment url",
    url: session.url,
  });
});

exports.sessionStatus = catchAsync(async (req, res) => {
  const sessionId = req.query.sessionId;
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status === "paid") {
    const user = session.metadata.userId;
    const scholarship = session.metadata.scholarshipId;
    const transactionId = session.payment_intent;
    const totalAmount = session.amount_total / 100;
    const currency = session.currency;

    const updateApplication = await Application.findOneAndUpdate(
      { user, scholarship },
      { paymentStatus: "Paid" },
      { new: true, runValidators: true }
    );

    let paymentHistory = await Payment.findOne({ transactionId });

    if (!paymentHistory) {
      paymentHistory = await Payment.create({
        user,
        scholarship,
        transactionId,
        totalAmount,
        currency,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "successfully paid your application",
      data: { updateApplication, paymentHistory },
    });
  }
  res.status(200).json({
    status: "pending",
    message: "Payment not completed",
  });
});
