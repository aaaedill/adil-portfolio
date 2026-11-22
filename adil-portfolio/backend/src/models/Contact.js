
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters."],
      maxlength: [100, "Name cannot exceed 100 characters."],
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      maxlength: [150, "Email cannot exceed 150 characters."],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address.",
      ],
    },

    subject: {
      type: String,
      trim: true,
      maxlength: [200, "Subject cannot exceed 200 characters."],
      default: "Portfolio Enquiry",
    },

    message: {
      type: String,
      required: [true, "Message is required."],
      trim: true,
      minlength: [5, "Message must contain at least 5 characters."],
      maxlength: [3000, "Message cannot exceed 3000 characters."],
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
