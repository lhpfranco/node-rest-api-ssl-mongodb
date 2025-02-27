const {findOneUser,addOneUserDB} = require('../repository/userRepository');
const MongoError = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const validateUser = async (username, password) => {
    
    const user = await findOneUser(username);

    if (!user) {
        return { success: false, message: 'User not found' };
    }

    const isValidPassword = await bcrypt.compareSync(JSON.stringify(password), user.password);

    if (!isValidPassword) {
        return { success: false, message: 'Incorrect password' };
    }

    return { success: true, message: 'User authenticated' };
};


const addOneUser = async (username, password) => {

    const saltRounds = 10;
    password = bcrypt.hashSync(password.toString(), saltRounds);

    const newUser = {username, password};
    
    try{
        await addOneUserDB(newUser);
    }catch(err){
        if (err instanceof MongoError && err.code === 11000) {
            // Handle duplicate key error
            console.log(`Username ${username} already exists`);
            res.status(409).json({ err: "Username already exists" });
        }else{
            return { success: false, message: 'Error while adding user.'};
        }
    }

    return { success: true, message: 'User added.' };
    
};

module.exports = {validateUser, addOneUser};
