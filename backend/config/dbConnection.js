import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

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

export default connectDB;