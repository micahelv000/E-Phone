const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied");
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.user = user;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Access denied");
  }
  next();
};