const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    date: {
      type: Date,
      required: [true, "Date is required"],
    },

    location: {
      type: String,
      required: [true, "Location is required"],
    },

    category: {
      type: String,
      required: true,
    },

    requiredVolunteers: {
      type: Number,
      required: true,
    },

    volunteers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);