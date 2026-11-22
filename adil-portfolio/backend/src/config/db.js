
const mongoose = require("mongoose");

// =========================================
// CONNECT TO MONGODB
// =========================================

const connectDB = async () => {
  try {

    // CHECK DATABASE URI

    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is not defined in the environment variables."
      );
    }

    // CONNECT TO DATABASE

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    // CONNECTION SUCCESS

    console.log(
      `MongoDB connected successfully: ${conn.connection.host}`
    );

    console.log(
      `Database name: ${conn.connection.name}`
    );

  } catch (error) {

    // CONNECTION ERROR

    console.error(
      "MongoDB connection failed:",
      error.message
    );

    process.exit(1);

  }
};

// =========================================
// EXPORT DATABASE CONNECTION
// =========================================

module.exports = connectDB;
