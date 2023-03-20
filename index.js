const express = require("express");
const v1AuthRouter = require('./src/routes/userRoutes');
const config = require('./config/config');

const app = express();
const PORT = config.port; 

app.use(express.json());
app.use("/api/v1/user", v1AuthRouter);

app.listen(PORT, () => { 
  console.log(`Server is listening on port ${PORT}`); 
});
