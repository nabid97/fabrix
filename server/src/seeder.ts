import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Product, { ClothingProduct, FabricProduct } from './models/Product';
import Order from './models/Order';
import config from './config';

// Sample data
import users from './data/users';
import clothingProducts from './data/clothingProducts';
import fabricProducts from './data/fabricProducts';

// Load environment variables
dotenv.config();

// Connect to database
mongoose.connect(config.mongoURI);

// Import data into the database
const importData = async () => {
  try {
    // Clear all existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Add admin user reference to products
    const clothingProductsWithUser = clothingProducts.map(product => {
      return { ...product, user: adminUser };
    });

    const fabricProductsWithUser = fabricProducts.map(product => {
      return { ...product, user: adminUser };
    });

    // Insert products
    await ClothingProduct.insertMany(clothingProductsWithUser);
    await FabricProduct.insertMany(fabricProductsWithUser);

    console.log('\x1b[32m%s\x1b[0m', 'Data imported!');
    process.exit();
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `Error: ${error}`);
    process.exit(1);
  }
};

// Destroy all data in the database
const destroyData = async () => {
  try {
    // Clear all existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('\x1b[31m%s\x1b[0m', 'Data destroyed!');
    process.exit();
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `Error: ${error}`);
    process.exit(1);
  }
};

// Determine which function to run based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}