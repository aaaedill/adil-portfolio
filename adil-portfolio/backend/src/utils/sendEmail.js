
const nodemailer = require("nodemailer");

// =========================================
// EMAIL CONFIGURATION
// =========================================

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

// =========================================
// CREATE EMAIL TRANSPORTER
// =========================================

const transporter =
  EMAIL_USER && EMAIL_PASS
    ? nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      })
    : null;

// =========================================
// SEND CONTACT NOTIFICATION EMAIL
// =========================================

const sendEmail = async ({ name, email, subject, message }) => {
  try {

    // CHECK EMAIL CONFIGURATION

    if (!transporter || !RECEIVER_EMAIL) {
      throw new Error(
        "Email configuration is incomplete. Check your environment variables."
      );
    }

    // VALIDATE SENDER EMAIL

    if (
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      throw new Error("Invalid sender email address.");
    }

    // EMAIL CONTENT

    const mailOptions = {
      from: `"Adil Portfolio" <${EMAIL_USER}>`,

      to: RECEIVER_EMAIL,

      replyTo: email.trim().toLowerCase(),

      subject: subject || "New Portfolio Contact Message",

      text: `
You have received a new message from your portfolio website.

Name: ${name}
Email: ${email}
Subject: ${subject || "Portfolio Enquiry"}

Message:
${message}
      `,
    };

    // SEND EMAIL

    const info = await transporter.sendMail(mailOptions);

    console.log(
      "Contact notification email sent:",
      info.messageId
    );

    return info;

  } catch (error) {

    console.error(
      "Email sending failed:",
      error.message
    );

    throw error;

  }
};

// =========================================
// EXPORT FUNCTION
// =========================================

module.exports = sendEmail;
