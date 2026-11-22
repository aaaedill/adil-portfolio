
const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

// =========================================
// SUBMIT CONTACT FORM
// =========================================

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // =========================================
    // VALIDATE REQUIRED FIELDS
    // =========================================

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    // =========================================
    // VALIDATE DATA TYPES
    // =========================================

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      (subject !== undefined && typeof subject !== "string")
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid form data.",
      });
    }

    // =========================================
    // CLEAN INPUT VALUES
    // =========================================

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanSubject = subject?.trim() || "Portfolio Enquiry";
    const cleanMessage = message.trim();

    // =========================================
    // VALIDATE EMPTY FIELDS
    // =========================================

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // =========================================
    // VALIDATE EMAIL ADDRESS
    // =========================================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // =========================================
    // VALIDATE FIELD LENGTHS
    // =========================================

    if (
      cleanName.length > 100 ||
      cleanEmail.length > 150 ||
      cleanSubject.length > 200 ||
      cleanMessage.length > 3000
    ) {
      return res.status(400).json({
        success: false,
        message: "One or more fields exceed the allowed length.",
      });
    }

    // =========================================
    // SAVE MESSAGE IN MONGODB
    // =========================================

    const newContact = await Contact.create({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    });

    console.log(
      "Contact message saved successfully:",
      newContact._id
    );

    // =========================================
    // SEND EMAIL NOTIFICATION
    // =========================================

    let emailSent = false;

    try {
      await sendEmail({
        name: newContact.name,
        email: newContact.email,
        subject: newContact.subject,
        message: newContact.message,
      });

      emailSent = true;

      console.log("Contact notification email sent successfully.");

    } catch (emailError) {
      console.error(
        "Contact notification email failed:",
        emailError.message
      );
    }

    // =========================================
    // SUCCESS RESPONSE
    // =========================================

    return res.status(201).json({
      success: true,

      message: emailSent
        ? "Your message has been submitted successfully."
        : "Your message was saved, but email notification could not be sent.",

      emailSent,
    });

  } catch (error) {

    // =========================================
    // ERROR HANDLING
    // =========================================

    console.error(
      "Contact submission error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to submit your message. Please try again later.",
    });

  }
};

// =========================================
// EXPORT CONTROLLER
// =========================================

module.exports = { submitContact };
