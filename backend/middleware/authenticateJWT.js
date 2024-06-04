const jwt = require('jsonwebtoken');

// DB Models
const User = require('../models/User');

const authenticateJWT = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).send('Access token is missing or invalid');
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Optionally, you could fetch the user details from the database
		const user = await User.findById(decoded.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		req.user = {
			id: user._id,
			username: user.username,
			role: user.role,
		};

		next();
	} catch (error) {
		return res.status(403).json({ message: 'Invalid or expired token' });
	}
};

module.exports = authenticateJWT;
