const mongoose = require("mongoose");

const scholarshipsSchema = new mongoose.Schema(
  {
    scholarshipName: {
      type: String,
      required: [true, "A scholarship must have a name!"],
      unique: true,
      trim: true,
      maxLength: [100, "scholarship name at least 100 character or below"],
      minLength: [5, "scholarship name at least 5 character or higher"],
    },
    universityName: {
      type: String,
      required: [true, "A scholarship must have a university name!"],
      maxLength: [100, "university name at least 100 character or below"],
      minLength: [5, "university name at least 5 character or higher"],
    },
    universityImage: {
      type: String,
      required: [true, "Please give a awesome cover image for scholarship!"],
    },
    universityCountry: {
      type: String,
      required: [true, "University must have a university Country!"],
      maxLength: [100, "Country name at least 100 character or below"],
      minLength: [5, "Country name at least 5 character or higher"],
    },
    universityCity: {
      type: String,
      required: [true, "University must have a university City!"],
      maxLength: [100, "City name at least 100 character or below"],
      minLength: [5, "City name at least 5 character or higher"],
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
        values: ["Full-fund", "Partial", "Self-fund"],
        message: `"{VALUE}" not supported You should choose either "Full-fund", "Partial", "Self-fund"`,
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
    tuitionFees: { type: Number },
    applicationFees: { type: Number },
    serviceCharge: { type: Number },
    applicationDeadline: { type: Date },
    scholarshipPostDate: { type: Date },
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
