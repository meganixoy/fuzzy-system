const { PrismaClient } = require("@prisma/client");

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

// Disconnect function to be used when necessary
const disconnect = async () => {
  await prisma.$disconnect();
};

module.exports = {
  prisma,
  disconnect,
};
