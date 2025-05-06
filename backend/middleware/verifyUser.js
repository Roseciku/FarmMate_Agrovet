const jwt = require("jsonwebtoken");

exports.verifyUser = (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    req.user = decoded; // attaches { userId, email } to the request object
    next();
  } catch (err) {
    return res.status(403).json({ message: "Forbidden - Invalid token" });
  }
};
