const mongoose = require("mongoose");

const scholarshipsSchema = new mongoose.Schema(
  {
    scholarshipName: {
      type: String,
      required: [true, "A scholarship must have a name!"],
      unique: true,
      trim: true,
    },
    universityName: {
      type: String,
      required: [true, "A scholarship must have a university name!"],
    },
    universityImage: {
      type: String,
      required: [true, "Please give a awesome cover image for scholarship!"],
    },
    universityCountry: {
      type: String,
      required: [true, "University must have a university Country!"],
    },
    universityCity: {
      type: String,
      required: [true, "University must have a university City!"],
    },
    universityWorldRank: {
      type: Number,
      required: [true, "University must have a universityWorldRank"],
    },
    subjectCategory: {
      type: String,
      required: ["true", "Scholarship must have a subjectCategory"],
    },
    scholarshipCategory: {
      type: String,
      enum: {
        values: ["Full-Fund", "Partial-Fund", "Self-Fund"],
        message: `"{VALUE}" not supported You should choose either "Full-Fund", "Partial-Fund", "Self-Fund"`,
      },
      required: [true, "Scholarship must have a scholarshipCategory"],
    },
    degree: {
      type: String,
      enum: {
        values: ["Diploma", "Bachelor", "Masters"],
        message: `"{VALUE}" not supported You should choose either "Diploma", "Bachelor", "Masters"`,
      },
      required: [true, "Scholarship must have a scholarshipCategory"],
    },
    tuitionFees: { type: Number, default: 0 },
    applicationFees: {
      type: Number,
      required: [true, "A Scholarship must have a price"],
    },
    serviceCharge: { type: Number, default: 0 },
    scholarshipPostDate: { type: Date, default: Date.now },
    applicationDeadline: {
      type: Date,
      required: [true, "A scholarship must have a deadline"],
    },
    postedUserEmail: {
      type: String,
      required: [true, "Please tell who provide the scholarship"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

scholarshipsSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "scholarship",
  localField: "_id",
});

const Scholarship = mongoose.model("Scholarship", scholarshipsSchema);

module.exports = Scholarship;
