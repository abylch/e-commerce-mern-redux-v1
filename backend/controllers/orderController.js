import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { calcPrices } from '../utils/calcPrices.js';
import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
// TODO fix no token after an hour of login, use try catch redirect to login
const addOrderItems = asyncHandler(async (req, res) => {
  console.log("hello from addOrderItems");
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  console.log(orderItems);
  console.log(paymentMethod);

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // get the ordered items from our database
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    console.log("itemsFromDB",itemsFromDB);

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    console.log("dbOrderItems",dbOrderItems);

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    console.log("itemsPrice",itemsPrice);
    console.log("taxPrice",taxPrice);
    console.log("shippingPrice",shippingPrice);
    console.log("totalPrice",totalPrice);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {

  // for dev testing only erase for production
  if (req.body.payer === "test") {
    const order = await Order.findById(req.params.id);
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } 
  // else {
  //   res.status(404);
  //   throw new Error('Order not found');
  // }
  // for dev testing only erase for production


  console.log("hi from updateOrderToPaid, verify paypal payment");
  console.log("req.body", req.body);
  const { verified, value } = await verifyPayPalPayment(req.body.id);
  console.log("verified", verified);
  console.log("value", value);

  if (!verified) throw new Error('Payment not verified');

  // check if this transaction has been used before
  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) throw new Error('Transaction has been used before');

  const order = await Order.findById(req.params.id);

  if (order) {
    // check the correct amount was paid
    const paidCorrectAmount = order.totalPrice.toString() === value;
    if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  //res.send('update order to delivered');
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  //res.send('get all orders');
  // const orders = await Order.find({}).populate('user', 'id name');
  // res.json(orders);

  // product paginate update
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  // const count = await Product.countDocuments();
  // const products = await Product.find()
  // search funtionality
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  console.log("keyword from orderController.js ", keyword);

  const count = await Order.countDocuments({ ...keyword }).populate('user', 'id name');
  const orders = await Order.find({ ...keyword })
    .populate('user', 'id name')
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // Calculate the number of pages
  const totalPages = Math.ceil(count / pageSize);

  console.log("totalPages from orderController.js after order.find({ ...keyword } ", totalPages);
  console.log("orders lenght from orderController.js after order.find({ ...keyword } ", orders.length);
  res.json({ orders, page, pages: totalPages });
  
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};