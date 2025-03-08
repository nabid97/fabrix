import AWS from 'aws-sdk';
import config from '../../config';

// Configure AWS SDK
AWS.config.update({
  region: config.aws.region,
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey
});

// Add this function to handle the logo bucket:

export const getLogoUrl = (logoFileName: string): string => {
  // Use a different bucket for logos
  const logoBucket = process.env.AWS_LOGO_BUCKET || 'your-logo-bucket-name';
  return `https://${logoBucket}.s3.${config.aws.region}.amazonaws.com/logos/${logoFileName}`;
};

//Then use this function when you need to reference a logo:
//import { getLogoUrl } from '../services/aws/s3Service';
// Example usage
//const logoUrl = getLogoUrl('company-logo.png');

// Initialize S3 service
const s3 = new AWS.S3();

/**
 * Upload file to S3 bucket
 * @param fileData - File buffer or stream
 * @param fileName - Target file name in S3
 * @param folder - Target folder in S3 bucket
 * @returns URL of the uploaded file
 */
export const uploadToS3 = async (
  fileData: Buffer | string,
  fileName: string,
  folder: string = ''
): Promise<string> => {
  // Construct key with folder if provided
  const key = folder ? `${folder}/${fileName}` : fileName;
  
  // Prepare upload parameters
  const params = {
    Bucket: config.aws.s3Bucket,
    Key: key,
    Body: fileData,
    ContentType: getContentType(fileName),
    ACL: 'public-read'
  };
  
  try {
    // Upload to S3
    const data = await s3.upload(params).promise();
    
    // Return the URL of the uploaded file
    return data.Location;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw new Error('Failed to upload file to S3');
  }
};

/**
 * Delete file from S3 bucket
 * @param fileName - File name to delete
 * @param folder - Folder in S3 bucket
 */
export const deleteFromS3 = async (
  fileName: string,
  folder: string = ''
): Promise<void> => {
  // Construct key with folder if provided
  const key = folder ? `${folder}/${fileName}` : fileName;
  
  // Prepare delete parameters
  const params = {
    Bucket: config.aws.s3Bucket,
    Key: key
  };
  
  try {
    // Delete from S3
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error('S3 delete error:', error);
    throw new Error('Failed to delete file from S3');
  }
};

/**
 * Get content type based on file extension
 * @param fileName - File name with extension
 * @returns Content type string
 */
const getContentType = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    case 'pdf':
      return 'application/pdf';
    case 'doc':
      return 'application/msword';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'xls':
      return 'application/vnd.ms-excel';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'txt':
      return 'text/plain';
    default:
      return 'application/octet-stream';
  }
};