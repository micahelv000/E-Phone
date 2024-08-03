const mongoose = require('mongoose');
const dbURI = process.env.DB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;