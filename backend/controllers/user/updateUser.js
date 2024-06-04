const bcrypt = require('bcryptjs');

// DB Models
const User = require('../../models/User');
const UserRole = require('../../models/UserRole');

// Custom Utils
const { sendEmail } = require('../../utils/emailSender/sendEmail');
const { emailVerificationTemplate } = require('../../utils/emailSender/emailVerificationTemplate');
const { passwordChangeTemplate } = require('../../utils/emailSender/passwordChangeTemplate');

exports.updateUser = async (req, res) => {
	// req.body cause of sensitive data
	const { oldUsername, newUsername, oldPassword, newPassword, newRole } =
		req.body;
	try {
		// Check if the user exists
		const user = await User.findOne({ username: oldUsername });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Check if the request is from the user themselves or an admin
		if (req.user.role !== 'Admin' && user._id.toString() !== req.user.id) {
			return res
				.status(403)
				.json({ message: 'Not authorized to update this user' });
		}
		
		// Check the old password matches
		if (
			oldPassword &&
			!(await bcrypt.compare(oldPassword, user.password))
		) {
			return res.status(400).json({ message: 'Invalid old password' });
		}

		// change password if needed and send info email about the change
		if (newPassword) {
			user.password = await bcrypt.hash(newPassword, 12);
			await sendEmail(
				user.username,
				'Your Password was changed',
				passwordChangeTemplate
			);
		}

		// Check if the new username is available
		if (newUsername && newUsername !== oldUsername) {
			const usernameExists = await User.findOne({
				username: newUsername,
			});
			if (usernameExists) {
				return res
					.status(400)
					.json({ message: 'Username is not available' });
			}

			// Generate a verification token and expiry time to 48 hours for the new email
			const verifyToken = crypto.randomBytes(20).toString('hex');
			const verifyExpires = Date.now() + 48 * 3600 * 1000;

			// Saves the new in DB and after verify it will replace the old
			user.newUsername = newUsername;
			user.newUsernameToken = verifyToken;
			user.newUsernameExpires = verifyExpires;

			const emailContent = emailVerificationTemplate(
				verifyToken,
				user._id.toString()
			);
			await sendEmail(
				newUsername,
				'Verify your new email address',
				emailContent
			);
		}

		if (newRole) {
			const roleDoc = await UserRole.findOne({ role: newRole });
			if (!roleDoc) {
				return res.status(400).json({ message: 'Role not found' });
			}
			user.role = roleDoc._id;
		}

		await user.save();
		res.status(200).json({
			message: 'Update successful.',
			user,
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
