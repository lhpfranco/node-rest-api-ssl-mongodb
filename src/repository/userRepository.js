const MongoClient = require('mongodb').MongoClient;
const config = require('../../config/config');
const { mongoClientConnect, mongoClientClose } = require('../connectors/mongoDbConnector')


const findOneUser = async (username) => {
    let collection = await mongoClientConnect(config.mongoDbUrl, config.mongoDbName, config.mongoDbCollectionName);
    
    try{
        const user = await collection.findOne({ username });
    }catch(err){
        console.error(`MongoDB collection ${config.mongoDbName} insertOne error: ${err.message}`);
        throw new Error(err);
    }
    
    await mongoClientClose();
    return user;
};


const addOneUserDB = async (newUser) => {
    let collection = await mongoClientConnect(config.mongoDbUrl, config.mongoDbName, config.mongoDbCollectionName);
   
    try{
        await collection.createIndex({ username: 1 }, { unique: true });
        await collection.insertOne(newUser);
    }catch(err){
        console.error(`MongoDB collection ${config.mongoDbName} insertOne error: ${err.message}`);
        throw new Error(err);
    }
    
    await mongoClientClose();
};

module.exports = {
    findOneUser, 
    addOneUserDB
};
