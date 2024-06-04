const jwt = require('jsonwebtoken');

exports.generateRefreshToken = async (user) => {
	const refreshToken = jwt.sign(
		{ id: user._id },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: '7d' }
	);
	user.refreshToken = refreshToken;
	await user.save();
	return refreshToken;
};
