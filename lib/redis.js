if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { Redis } = require("ioredis");

const redisUrl = process.env.REDIS_URL;

const redisClient = new Redis(redisUrl);

redisClient.on("error", (err) => {
  console.error("Redis error", err);
});

module.exports = { redisClient };
