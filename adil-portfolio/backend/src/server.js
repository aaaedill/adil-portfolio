
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// =========================================
// SECURITY MIDDLEWARE
// =========================================

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

// =========================================
// API RATE LIMITER
// =========================================

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

// =========================================
// REQUEST BODY PARSERS
// =========================================

app.use(express.json({ limit: "10kb" }));

app.use(
  express.urlencoded({
    extended: false,
    limit: "10kb",
  })
);

// =========================================
// CONTACT FORM RATE LIMITER
// =========================================

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many contact submissions. Please try again later.",
  },
});

// =========================================
// HEALTH CHECK ROUTES
// =========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Adil Portfolio API is running!",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is healthy!",
  });
});

// =========================================
// CONTACT ROUTES
// =========================================

app.use(
  "/api/contact",
  contactLimiter,
  contactRoutes
);

// =========================================
// 404 HANDLER
// =========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =========================================
// GLOBAL ERROR HANDLER
// =========================================

app.use((error, req, res, next) => {

  console.error("Server error:", error.message);

  // Avoid sending another response if headers were already sent.

  if (res.headersSent) {
    return next(error);
  }

  // INVALID JSON

  if (
    error instanceof SyntaxError &&
    error.status === 400 &&
    "body" in error
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body.",
    });
  }

  // REQUEST BODY TOO LARGE

  if (error.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      message: "Request body is too large.",
    });
  }

  // GENERAL SERVER ERROR

  return res.status(500).json({
    success: false,
    message: "Internal server error.",
  });

});

// =========================================
// START SERVER
// =========================================

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });

  } catch (error) {

    console.error("Server startup failed:", error.message);

    process.exit(1);

  }
};

startServer();
