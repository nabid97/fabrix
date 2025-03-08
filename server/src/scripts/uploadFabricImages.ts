import fs from 'fs';
import path from 'path';
import { uploadToS3 } from '../services/aws/s3Service';

const FABRIC_IMAGES = [
  'Cotton.jpg',
  'Linen.jpg',
  'Polyester.jpg',
  'Silk.jpg',
  'Wool.jpg'
];

const uploadFabricImages = async () => {
  // Create fabric images directory if it doesn't exist
  const imagesDir = path.join(__dirname, '../data/fabricImages');
  if (!fs.existsSync(imagesDir)) {
    console.log(`Creating directory: ${imagesDir}`);
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  console.log(`Looking for fabric images in: ${imagesDir}`);
  
  for (const filename of FABRIC_IMAGES) {
    try {
      const filePath = path.join(imagesDir, filename);
      
      // Make sure file exists
      if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        console.log(`Please place ${filename} in ${imagesDir}`);
        continue;
      }
      
      const fileData = fs.readFileSync(filePath);
      
      // Upload to S3 with fabric name as the key
      const s3Key = `fabrics/${filename}`;
      await uploadToS3(fileData, s3Key, 'fabrics');
      
      console.log(`✅ Uploaded ${filename} to S3 at ${s3Key}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${filename}:`, error);
    }
  }
  
  console.log('Fabric image upload complete!');
};

// Run the script
uploadFabricImages().catch(console.error);
