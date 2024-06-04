// Custom Utils
const {	verifyRefreshToken } = require('../../utils/auth/verifyRefreshToken');
const {	generateRefreshToken } = require('../../utils/auth/generateRefreshToken');

exports.refreshToken = async (req, res) => {
	const { refreshToken } = req.cookies; // Ensure cookie-parser middleware is used
	if (!refreshToken)
		return res.status(401).json({ message: 'No refresh token provided' });

	try {
		const user = await verifyRefreshToken(refreshToken);
		const newToken = jwt.sign(
			{ id: user._id, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);

		// Generate a new refresh token
		const newRefreshToken = await generateRefreshToken(user);

		res.cookie('token', newToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
		});

		// Send a new refresh token
		res.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
		});

		res.status(200).json({ accessToken: newToken });
	} catch (error) {
		res.status(403).json({ message: error.message });
	}
};
