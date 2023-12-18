const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB, conn.connection.host: ', conn.connection.host);
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with an error code of 1 (indicating a failure)
  }
};

module.exports = connectDB;