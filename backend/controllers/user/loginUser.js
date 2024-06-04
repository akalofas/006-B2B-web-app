const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// DB Models
const User = require('../../models/User');

// Custom Utils
const { generateRefreshToken } = require('../../utils/auth/generateRefreshToken');

exports.loginUser = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (user && (await bcrypt.compare(password, user.password))) {
			if (!user.isVerified) {
				return res
					.status(403)
					.json({ message: 'Account not verified' });
			}

			const token = jwt.sign(
				{ id: user._id, role: user.role },
				process.env.JWT_SECRET,
				{ expiresIn: '1h' }
			);

			const refreshToken = await generateRefreshToken(user);

			res.cookie('token', token, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
			});

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
			});

			res.status(200).json({ message: 'Logged in successfully' });
		} else {
			res.status(400).send('Invalid credentials');
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};