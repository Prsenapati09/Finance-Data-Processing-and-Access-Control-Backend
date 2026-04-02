const mongoose = require("mongoose");

// connect mongodb
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Database Error", error);
  }
}

module.exports = connectDB;