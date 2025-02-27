const MongoClient = require('mongodb').MongoClient;

let client = null;
let db = null;
let collection = null

async function mongoClientConnect(dbUrl, dbName, collectionName) {

    try {
        if (!client) {
            client = await MongoClient.connect(dbUrl);
            db = client.db(dbName);
            collection = db.collection(collectionName);
        }
        console.log('MongoDB connection established')
        return collection;
    }catch(err){
        console.error(`MongoDB connection error: ${err.message}`);
        throw new Error(err);
    }
}

async function mongoClientClose() {
    try {
      if (client) {
        await client.close()
        client = null
      }
      console.log('MongoDB connection closed')
    } catch (err) {
      console.error(`MongoDB disconnection error: ${err.message}`)
      throw new Error(err);
    }
  }

  module.exports = {
    mongoClientConnect,
    mongoClientClose,
    collection
  }