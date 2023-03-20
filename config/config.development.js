require('dotenv').config({ path: './.env' });

const config = {
    mongoDbUrl: process.env.MONGODB_URL,
    mongoDbName: process.env.MONGODB_NAME,
    mongoDbCollectionName: process.env.MONGODB_COLLECTION_NAME,
    port: 3000
  };

  module.exports = config;