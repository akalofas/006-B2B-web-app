const rateLimit = require('express-rate-limit');

// General rate limit to apply to all requests
// 15 minutes, max 100 per IP, Disable the X-Rate-Limit
exports.generalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
});