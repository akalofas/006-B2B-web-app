const crypto = require('crypto');

// DB Models
const User = require('../../models/User');

// Custom utils
const { sendEmail } = require('../../utils/emailSender/sendEmail');
const { emailVerificationTemplate } = require('../../utils/emailSender/emailVerificationTemplate');

exports.verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({
            verifyToken: token
        });

        if (!user) {
            return res.status(400).json({ message: "Verification link is invalid." });
        }

        if (user.verifyExpires < Date.now()) {
            // Token has expired, generate a new one and resend email
            const newToken = crypto.randomBytes(20).toString('hex');
            const verifyExpires = Date.now() + 48 * 3600 * 1000;

            user.verifyToken = newToken;
            user.verifyExpires = verifyExpires;
            await user.save();

            const emailContent = emailVerificationTemplate(newToken, user._id.toString());
            await sendEmail(user.username, 'Verify your Email address', emailContent);

            return res.status(200).json({ message: "Verification link has expired. A new verification email has been sent." });
        }

        // Token is valid and not expired
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Your account has been successfully verified." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
