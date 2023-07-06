const jwt = require("jsonwebtoken");
require("dotenv").config();
const checkLogin = (req, res, next) => {
  const { Authorization } = req.headers;
  try {
    const token = Authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const { email, id } = decoded;
    req.email = email;
    req.id = id;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

module.exports = checkLogin;
