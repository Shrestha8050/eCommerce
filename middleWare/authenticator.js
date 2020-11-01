const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');

exports.authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      errorMessage: 'no Token Authorization denied',
    });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log('jwt Error', err);
    res.status(401).json({
      errorMessage: 'Invalid Token',
    });
  }
};
