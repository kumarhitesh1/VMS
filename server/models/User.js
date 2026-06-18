const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
      },
    ],

    availability: {
      type: String,
      enum: ["Weekdays", "Weekends", "Anytime"],
      required: true,
    },

    emergencyContactName: {
      type: String,
      required: true,
    },

    emergencyContactPhone: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "volunteer"],
      default: "volunteer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);