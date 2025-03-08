import mongoose from 'mongoose';
import { FabricProduct } from '../models/Product';
import config from '../config';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const S3_BUCKET = 'your-bucket-name'; // Replace with your bucket name
const S3_REGION = 'us-east-1';        // Replace with your region

const updateFabricProductImages = async () => {
  // Connect to database
  await connectDB();
  
  // Fabric type to image mapping
  const fabricImages: Record<string, string[]> = {
    'Cotton': [`https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/fabric-images/Cotton.jpg`],
    'Polyester': [`https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/fabric-images/Polyester.jpg`],
    'Silk': [`https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/fabric-images/Silk.jpg`],
    'Wool': [`https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/fabric-images/Wool.jpg`],
    'Linen': [`https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/fabric-images/Linen.jpg`],
  };
  
  
  try {
    // Find all fabric products
    const fabricProducts = await FabricProduct.find();
    console.log(`Found ${fabricProducts.length} fabric products`);
    
    let updatedCount = 0;
    
    for (const product of fabricProducts) {
      const fabricType = product.fabricType;
      
      // Check if we have an image for this fabric type
      if (fabricImages[fabricType]) {
        // Update product with S3 image URLs
        product.images = fabricImages[fabricType];
        await product.save();
        updatedCount++;
        console.log(`✅ Updated images for ${product.name} (${fabricType})`);
      } else {
        console.log(`❓ No image found for fabric type: ${fabricType} (${product.name})`);
      }
    }
    
    console.log(`Fabric product image update complete! Updated ${updatedCount} products.`);
  } catch (error) {
    console.error('Error updating fabric products:', error);
  } finally {
    // Disconnect from database
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the script
updateFabricProductImages();
