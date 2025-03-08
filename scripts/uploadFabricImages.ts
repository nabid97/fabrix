// server/src/scripts/updateFabricImages.ts
import mongoose from 'mongoose';
import { FabricProduct } from '../server/src/models/Product';
import config from '../config';

const S3_BUCKET = config.aws.s3Bucket;
const S3_REGION = config.aws.region;

const updateFabricProductImages = async () => {
  // Connect to MongoDB
  await mongoose.connect(config.mongoURI);
  console.log('Connected to MongoDB');
  
  // Fabric type to image mapping
  const fabricImages: Record<string, string[]> = {
    'Cotton': [`https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/fabric-images/Cotton.jpg`],
    'Polyester': [`https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/fabric-images/Polyester.jpg`],
    'Silk': [`https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/fabric-images/Silk.jpg`],
    'Wool': [`https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/fabric-images/Wool.jpg`],
    'Linen': [`https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/fabric-images/Linen.jpg`],
  };
  
  // Find all fabric products
  const fabricProducts = await FabricProduct.find();
  
  for (const product of fabricProducts) {
    const fabricType = product.fabricType;
    
    // Check if we have an image for this fabric type
    if (fabricImages[fabricType]) {
      // Update product with S3 image URLs
      product.images = fabricImages[fabricType];
      await product.save();
      console.log(`✅ Updated images for ${product.name} (${fabricType})`);
    } else {
      console.log(`❓ No image found for fabric type: ${fabricType} (${product.name})`);
    }
  }
  
  console.log('Fabric product image update complete!');
  mongoose.disconnect();
};

// Run the script
updateFabricProductImages().catch(console.error);