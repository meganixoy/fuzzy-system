function cors({ origin, credentials }) {
  return function (req, res, next) {
    // Allow requests from specific origin (replace example.com with your client URL)
    res.setHeader("Access-Control-Allow-Origin", origin);

    // Allow specific headers in requests
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Token, X-Device-Id"
    );

    // Allow specific HTTP methods
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");

    // Allow credentials (cookies, authorization headers, etc.)
    res.setHeader("Access-Control-Allow-Credentials", credentials);

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  };
}

module.exports = { cors };
