const {validateUser,addOneUser} = require('../services/userService');

const authenticateUser = async (req, res) => {
    const { username, password } = req.body;
    const result = await validateUser(username, password);
  
    if (result.success) {
      res.status(200).send({ message: result.message });
    } else {
      res.status(401).send({ message: result.message });
    }
};

const addUser = async (req, res) => {
  const { username, password } = req.body;
 
  const result = await addOneUser(username, password);

  if (result.success) {
    res.status(200).send({ message: result.message });
  } else {
    res.status(401).send({ message: result.message });
  }
  
};

module.exports = { 
    authenticateUser,
    addUser
}