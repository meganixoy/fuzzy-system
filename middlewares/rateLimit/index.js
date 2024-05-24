const rateLimitWindowMs = 15 * 60 * 1000; // 15 minutes
const baseRateLimitMaxRequests = 100; // Base max requests per IP/device
const increasedRateLimitMaxRequests = 2000; // Increased max requests per IP if no deviceId
const rateLimiters = new Map();

function rateLimit(req, res, next) {
  const ip = req.ip;
  const deviceId = req.headers["Idempotency-Key"] || "fallback-device"; // Use a fallback if the header is not set
  const key = deviceId !== "fallback-device" ? `${ip}-${deviceId}` : ip; // Use IP alone if no deviceId
  // Determine the rate limit based on whether a device ID is present
  const maxRequests =
    deviceId !== "fallback-device"
      ? baseRateLimitMaxRequests
      : increasedRateLimitMaxRequests;

  let rateLimiter = rateLimiters.get(key);

  if (!rateLimiter) {
    // No record exists for this key, create a new record
    rateLimiter = {
      lastResetTime: Date.now(),
      requestCount: 1,
    };
    rateLimiters.set(key, rateLimiter);
  } else {
    // Calculate time since last reset
    const timeSinceLastReset = Date.now() - rateLimiter.lastResetTime;

    if (timeSinceLastReset > rateLimitWindowMs) {
      // Reset the count and time
      rateLimiter.requestCount = 1;
      rateLimiter.lastResetTime = Date.now();
    } else {
      rateLimiter.requestCount += 1;
    }
  }

  // Check if the current request count exceeds the max allowed
  if (rateLimiter.requestCount > maxRequests) {
    return res.status(429).json({
      message:
        "You have made too many attempts in a short period. Please wait a few minutes before trying again.",
    });
  }

  // console.log(key, rateLimiter.requestCount);

  next();
}

module.exports = { rateLimit };
