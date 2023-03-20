const MongoClient = require('mongodb').MongoClient;
const config = require('../../config/config');

const findOneUser = async (username) => {
    const client = await MongoClient.connect(config.mongoDbUrl);
    const db = client.db(config.mongoDbName);
    const collection = db.collection(config.mongoDbCollectionName);
    const user = await collection.findOne({ username });
    const jsonString = JSON.stringify(user);
    console.log('returned user: ' + jsonString);
    client.close();
    return user;
};


const addOneUserDB = async (newUser) => {
    const client = await MongoClient.connect(config.mongoDbUrl);
    const db = client.db(config.mongoDbName);
    const collection = db.collection(config.mongoDbCollectionName);
    collection.insertOne(newUser, function(err, result) {
        if (err) throw err;
    
        console.log(`Added new user with ID ${result.insertedId}`);
        client.close();
    });
};

module.exports = {
    findOneUser, 
    addOneUserDB
};
