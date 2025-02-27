const {validateUser,addOneUser} = require('../services/userService');

const authenticateUser = async (req, res) => {
    
  try{
    const { username, password } = req.body;
    const result = await validateUser(username, password);

    if (result.success) {
      res.status(200).send({ message: result.message });
    } else {
      res.status(401).send({ message: result.message });
    }

  }catch(err){
    console.error(`Error: ${err.message}`);
    res.status(500).json({ success: false, message: err.message });
  }
    
};

const addUser = async (req, res) => {

  try{
    const { username, password } = req.body;
  
    const result = await addOneUser(username, password);

    if (result.success) {
      res.status(200).send({ message: result.message });
    } else {
      res.status(401).send({ message: result.message });
    }
  }catch(err){
    console.error(`Error: ${err.message}`);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { 
    authenticateUser,
    addUser
}