const jwt = require("jsonwebtoken");
const config = require("../config");

exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    
    const decodedToken = jwt.verify(token, config.JWT_KEY);
   
    req.userData = { email: decodedToken.email, userId: decodedToken.id};
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "You are not authenticated!" });
  }
};