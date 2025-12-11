require("@dotenvx/dotenvx").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const catchAsync = require("./../utils/catchAsync.js");
const Scholarship = require("./../models/scholarshipsModel.js");
const Payment = require("./../models/paymentHistory.js");
const Application = require("./../models/applicationModal.js");

exports.makePayment = catchAsync(async (req, res, next) => {
  const user = res.user;
  const scholarshipId = req.params.scholarshipId;
  const scholarship = await Scholarship.findById(scholarshipId);
  if (!scholarship) {
    return res.status(404).json({
      status: "fail",
      message: "No scholarship found for pay!",
    });
  }
  const price =
    parseInt(
      scholarship.applicationFees +
        scholarship.tuitionFees +
        scholarship.serviceCharge
    ) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: `Please Pay for ${scholarship.scholarshipName}`,
            unit_amount: price,
          },
        },
        quantity: 1,
      },
    ],
    customer_email: user.email,
    metadata: {
      scholarship,
      user,
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
  const sessionId = req.query.session_id;
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status === "paid") {
    let paymentHistory;
    const user = session.metadata.user.id;
    const scholarship = session.metadata.scholarship.id;
    const transactionId = session.payment_intent;
    const totalAmount = session.total_amount;
    const currency = session.currency;

    const updateApplication = await Application.findOneAndUpdate(
      { scholarship },
      { paymentStatus: "Paid" }
    );

    paymentHistory = await Payment.findOne({ transactionId });

    if (!paymentHistory) {
      paymentHistory = await Payment.create({
        user,
        scholarship,
        transactionId,
        totalAmount,
        currency,
      });
    }

    res.status(200).json({
      status: "success",
      message: "successfully paid your scholarship",
      data: { updateApplication, paymentHistory },
    });
  }
  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});
