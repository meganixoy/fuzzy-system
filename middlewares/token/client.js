if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const verifyClientToken = async (req, res, next) => {
  // Verify the access token
  if (req.headers.token !== process.env.CLIENT_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

module.exports = { verifyClientToken };
