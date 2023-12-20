// seeder for testing and insert data to mongodb for testing
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import cors from 'cors';
import connectDB from './config/dbConnection.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // insert user to db
    const createdUsers = await User.insertMany(users);
    // catch the admin user id from db
    const adminUser = createdUsers[0]._id;
    // adds the user admin id to the product data to make sure that the product is created by XXX admin user id.
    // map the product data to add the user id to the product data.
    // return the product data with the user id.
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });


    // this will be the sample products that will be inserted to the db.
    console.log("this will be the adminUser inserting the data");
    console.log("adminUser: ".green.inverse, adminUser);
    console.log("this will be the sample products that will be inserted to the db.");
    console.log("sampleProducts: ".green.inverse, sampleProducts);

    // insert products to db for testing
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// if in scrypt or in terminal run node seeder -d then it will destroy the data.
// anything else import the data
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}