
export default {

  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/fabrix',

  aws: {

    s3Bucket: process.env.AWS_S3_BUCKET || 'your-bucket-name',

    region: process.env.AWS_REGION || 'us-east-1'

  }

};

