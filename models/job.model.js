const mongoose = require("mongoose");

const Job = new mongoose.Schema(
  {
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    title: { type: String, required: true },
    tags: { type: String, required: true },
    Job_Description: { type: String, required: true },
    // location: { type: String, required: true },
    location: { type: String },
    budget: { type: String },
    photo_link: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", Job);
