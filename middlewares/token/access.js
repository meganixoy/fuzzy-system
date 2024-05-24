if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const jwt = require("jsonwebtoken");

const verifyUserToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({error: "Unauthorized", message: "Missing token"});

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({error: "Forbidden", message: "Invalid token"});
    req.user = user;
    next();
  });
};

module.exports = {verifyUserToken};
