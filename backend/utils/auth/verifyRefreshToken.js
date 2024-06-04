const jwt = require('jsonwebtoken');

// DB Models
const User = require('../../models/User');

exports.verifyRefreshToken = async (refreshToken) => {
	try {
		const payload = jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET
		);
		const user = await User.findById(payload.id);

		if (!user || user.refreshToken !== refreshToken) {
			return { error: 'Token mismatch or user not found', user: null };
		}
		return { error: null, user: user };
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			return { error: 'Refresh token expired', user: null };
		} else if (error instanceof jwt.JsonWebTokenError) {
			return { error: 'Invalid refresh token', user: null };
		} else {
			return { error: 'Token verification failed', user: null };
		}
	}
};
