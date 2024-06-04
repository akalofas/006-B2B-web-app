const rateLimit = require('express-rate-limit');

// Specific rate limit for creating accounts
// 60 minutes, max 5 creation per IP
exports.createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000,
	max: 5,
	message:
		'Too many accounts created from this IP, please try again after an hour',
});
