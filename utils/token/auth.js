const jwt = require("jsonwebtoken");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const generateAuthToken = (userId) => {
  try {
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      throw new Error("Missing secret key for JWT signing");
    }

    const expiresIn = "30d";

    const token = jwt.sign({ userId }, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error("Error generating auth token:", error.message);
    throw error; // Rethrow the error for higher-level error handling
  }
};

module.exports = { generateAuthToken };
