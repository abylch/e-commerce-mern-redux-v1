//const express = require('express');
import express from 'express';
//configure path to the .env file
//const dotenv = require('dotenv').config({ path: '../.env' });
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
//const cors = require('cors');
import cors from 'cors';
//const connectDB = require('./config/dbConnection');
import connectDB from './config/dbConnection.js';
//import Product from router
import productRoutes from './routes/productsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';




const app = express();
const PORT = process.env.PORT || 3002;

// Connect to MongoDB
connectDB();

// Use CORS middleware
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // Required for including cookies
};

app.use(cors(corsOptions));

// body parser middlewares
// Parse JSON request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parser middleware
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!, from e-Shop-Shop server');

})

//handle errors
app.use(notFound);
app.use(errorHandler);


// Start the server
app.listen(PORT, () => {
  console.log(`e-Shop-Shop app listening at http://localhost:${PORT}`);
});