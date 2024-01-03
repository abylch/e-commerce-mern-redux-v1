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
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import orderRoutes from './routes/orderRoutes.js';




const app = express();
const PORT = process.env.PORT || 3002;

// Connect to MongoDB
connectDB();

// Use CORS middleware
app.use(cors());

// body parser middlewares
// Parse JSON request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parser middleware
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello World!, from e-Shop-Shop server');

})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

//handle errors
app.use(notFound);
app.use(errorHandler);


// Start the server
app.listen(PORT, () => {
  console.log(`e-Shop-Shop app listening at http://localhost:${PORT}`);
});