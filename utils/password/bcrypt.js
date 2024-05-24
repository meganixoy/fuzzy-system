const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    // Handle errors appropriately
    console.error("Error hashing password:", error);
    throw error;
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    // Handle errors appropriately
    console.error("Error comparing password:", error);
    throw error;
  }
};

module.exports = { hashPassword, comparePassword };
