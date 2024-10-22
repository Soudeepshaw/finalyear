const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed for S3 upload' });
  }
};