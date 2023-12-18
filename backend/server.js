const express = require('express');
const products = require('./data/products');
//configure path to the .env file
const dotenv = require('dotenv').config({ path: '../.env' });
const cors = require('cors');
const connectDB = require('./config/dbConnection');



const app = express();
const PORT = process.env.PORT || 3002;

// Connect to MongoDB
connectDB();

// Use CORS middleware
app.use(cors());

// Parse JSON request body
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!, from e-Shop-Shop server');

})

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
});

// Start the server
app.listen(PORT, () => {
  console.log(`e-Shop-Shop app listening at http://localhost:${PORT}`);
});