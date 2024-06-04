const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// DB Models
const User = require('../../models/User');
const UserRole = require('../../models/UserRole');

// Custom utils
const { sendEmail } = require('../../utils/emailSender/sendEmail');
const { emailVerificationTemplate } = require('../../utils/emailSender/emailVerificationTemplate');

exports.registerUser = async (req, res) => {
	const { username, password } = req.body;
	try {
        // Check if username already exists (username = email)
		const userExists = await User.findOne({ username });
		if (userExists) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const role = await UserRole.findOne({ name: 'User' });
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

        // Generate a verification token and expiry time to 48 hours
		const verifyToken = crypto.randomBytes(20).toString('hex');
		const verifyExpires = Date.now() + 48 * 3600 * 1000;

        // Create a new user and save it to the database
		const newUser = new User({
			username,
			password: hashedPassword,
			role: role._id,
			verifyToken,
			verifyExpires,
			isVerified: false,
		});

		await newUser.save();

        // Send an email to the user with the verification token and user_id for increased security
        const emailContent = emailVerificationTemplate(verifyToken, newUser._id.toString());

		await sendEmail(
			newUser.username,
			'Verify your Email address',
			emailContent
		);

		res.status(201).json({
			message: 'User registered. Please verify your email.',
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
