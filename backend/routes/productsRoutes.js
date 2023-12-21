import express from "express";
const router = express.Router();
// for testing hardcoded data
//const products = require('./data/products');
//import products from '../data/products.js';

// we pass it to the productController
// import asyncHandler from "../middleware/asyncHandler.js";
// import Product from "../models/productModel.js";


// imports controllers
// import { getProducts, getProductById }
import {
    getProducts,
    getProductById,
  } from '../controllers/productController.js';


// we pass it to the productController
// router.get(
//     '/',
//     asyncHandler(async (req, res) => {
//       const products = await Product.find({});
//       res.json(products);
//     })
//   );
  
//   router.get(
//     '/:id',
//     asyncHandler(async (req, res) => {
//       const product = await Product.findById(req.params.id);
//       if (product) {
//         return res.json(product);
//       }
//       res.status(404);
//       throw new Error('Product not found');
//     })
//   );

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

  export default router;