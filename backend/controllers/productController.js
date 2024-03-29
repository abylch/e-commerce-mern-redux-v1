import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  //const products = await Product.find({});
  //res.json(products);
  // product paginate update
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  // const count = await Product.countDocuments();
  // const products = await Product.find()
  // search funtionality
  const keyword = req.query.keyword
    ? {
      $or: [
        { name: { $regex: req.query.keyword, $options: 'i' } },
        { description: { $regex: req.query.keyword, $options: 'i' } },
      ],
    }
    : {};

  console.log("keyword from productController.js ", keyword);


  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });

  console.log("products from productController.js after Product.find({ ...keyword } ", products);


});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error('Resource not found');
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock, isFeatured, displayItem, related, archiveItem } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.isFeatured = isFeatured;
    product.displayItem = displayItem;
    product.related = related;
    product.archiveItem = archiveItem;
 
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

// @desc    update product countInStock
// @route   PUT /api/products/:id/updateinstock
// @access  Public
const updateStockOnOrderPayment = asyncHandler(async (req, res) => {

  console.log("hi from productController.js ");
  //console.log("req from productController.js ", req);
  console.log("req.data from productController.js ", req.body.data);
  
  const product = await Product.findById(req.body.data.productId);

  if (!product) {
    res.status(404);
    throw new Error('product not found');
  }


  // Check if product is available
  if (product) {
    // Update countInStock based on the quantity in the order to remove -
    product.countInStock -= req.body.data.qty;

    // Save the updated product
    await product.save();
    res.status(201).json({ message: 'Stock Updated' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  updateStockOnOrderPayment,
  getAllProducts
};