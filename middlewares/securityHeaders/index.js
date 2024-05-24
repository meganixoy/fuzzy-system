function setSecurityHeaders(options = {}) {
  return function (req, res, next) {
    // Content Security Policy
    // As APIs typically don't serve HTML, this header might not be as crucial, but a restrictive policy can still be set.
    // injection attacks prevention
    const cspDirectives =
      options.csp || "default-src 'none'; frame-ancestors 'none';";
    res.setHeader("Content-Security-Policy", cspDirectives);

    // making it slightly harder for attackers to exploit specific vulnerabilities associated with known software
    res.removeHeader("X-Powered-By");

    // X-Content-Type-Options
    // prevents the browser from doing MIME-type sniffing
    res.setHeader("X-Content-Type-Options", "nosniff");

    // X-Frame-Options
    // For API servers, this header is less relevant but can be kept as a defensive measure.
    // instructing browsers to prevent the page from being rendered in a frame or iframe, which helps to prevent clickjacking attacks
    res.setHeader("X-Frame-Options", "DENY");

    // X-XSS-Protection
    // As this header is primarily for browsers rendering HTML and is deprecated, it can be omitted for APIs.

    // Referrer Policy
    // While not crucial for APIs, setting a restrictive referrer policy is a good privacy measure.
    res.setHeader("Referrer-Policy", "no-referrer");

    // Permissions Policy
    // Not particularly relevant for APIs, but setting it restrictively does no harm.
    res.setHeader("Permissions-Policy", "geolocation=(), microphone=()");

    // Strict-Transport-Security
    // Important for APIs to ensure interactions over HTTPS.
    if (options.hsts !== false) {
      const hstsDirectives =
        options.hsts || "max-age=63072000; includeSubDomains; preload";
      res.setHeader("Strict-Transport-Security", hstsDirectives);
    }

    next();
  };
}

module.exports = { setSecurityHeaders };
