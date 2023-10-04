const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    // Get the token from the request headers
    const token = req.headers["authorization"];
  
    if (typeof token !== "undefined") {
      // Remove the 'Bearer ' prefix from the token string
      const tokenString = token.split(" ")[1];
  
      jwt.verify(tokenString, secretKey, (err, decoded) => {
        if (err) {
          res.status(401).json({ error: "Invalid token" });
        } else {
          // Token is valid, save the decoded payload for future use
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(401).json({ error: "Token not provided" });
    }
  }

module.exports = verifyToken;
