const rateLimit = require('express-rate-limit');

exports.emailVerificationLimiter = rateLimit({
	// Max 5 times per 60 minutes
	windowMs: 60 * 60 * 1000,
	max: 5,
	standardHeaders: true, 
	legacyHeaders: false, 
	handler: (req, res ) => {
		res.status(429).json({
			message:
				'Too many verification attempts from this IP, please try again after an hour',
		});
		console.log(`Verification rate limit hit for IP: ${req.ip}`);
	},
});
