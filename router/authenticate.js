// middleware/authenticate.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
//   get token from header
  const token = req.header('x-auth-token');

//   check if token not exits
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
//    if token exits then handdle check token 
  try {
    //  check token
    const decoded = jwt.verify(token, 'abcd');
    // set  user to req.user
    req.user = decoded.userId;
    console.log(req.user);
    req.token = token;
    next();
  } catch (err) {
    const isUser = false;
    res.status(401).json({ msg: 'Token is not valid', isUser});
  }
};
