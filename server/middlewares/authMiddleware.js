const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    const decoded = jwt.decode(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(403).send("Invalid token");
    }

    jwt.verify(token, user.password, (err, decodedToken) => {
      if (err) {
        return res.status(403).send("Invalid token");
      }

      if (user.tokenVersion !== decodedToken.tokenVersion) {
        return res.status(403).send("Token invalidated");
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).send("Error verifying token");
  }
};

exports.isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    const decoded = jwt.decode(token);
    const user = await User.findById(decoded.userId);

    jwt.verify(token, user.password, (err, decodedToken) => {
      if (err || user.tokenVersion !== decodedToken.tokenVersion || !decodedToken.isAdmin) {
        return res.status(403).send("Token invalidated");
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(403).send("Access denied");
  }
};